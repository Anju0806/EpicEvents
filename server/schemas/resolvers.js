const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    //user queries
    users: async () => {
      return User.find().populate([{ path: 'events', strictPopulate: false }]);
    },
    userByUsername: async (parent, { username }) => {
      return User.findOne({ username }).populate([{ path: 'events', strictPopulate: false }]);
    },
    userByEmail: async (parent, { email }) => {
      return User.findOne({ email }).populate([{ path: 'events', strictPopulate: false }]);
    },

    //event queries
    events: async (parent, args) => {
      const currentDate = new Date(); // Get the current date and time
      const upcomingEvents = await Event.find({
        end_date: { $gt: currentDate }, // Compare end date with today date
      })
        .sort({ start_date: 1 }) // Sort(asc) events with start date 
        .limit(6) // Limit the results to 6 upcoming events
        .populate([{ path: 'events', strictPopulate: false }]);
      return upcomingEvents;
    },
    //get 1 event 
    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId }).populate([{ path: 'events', strictPopulate: false }]);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate([{ path: 'events', strictPopulate: false }]);
      }},
    //search for events which matches any of the condition(title,description, date btw start_date and end_date,location)
    searchevents: async (parent, args) => {
      let { search, searchdate, location } = args;
      // Trim spaces from the search parameter
      if (search) {
        search = search.trim();
      }
      // Build the query object based on the provided search criteria
      const query = {};
      // Use $or to match any of the provided conditions
      query.$or = [];
      if (search) {
        query.$or.push(
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        );
      }
      if (searchdate) {
        const convertedSearchDate = new Date(searchdate);
        // Match searchdate between start_date and end_date
        query.$or.push({
          start_date: { $lte: convertedSearchDate },
          end_date: { $gte: convertedSearchDate },
        });
      }
      if (location) {
        query.$or.push({ location: { $regex: location, $options: 'i' } });
      }
      const events = await Event.find(query)
        .sort({ start_date: 1 })
        .populate([{ path: 'events', strictPopulate: false }]);
      return events;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    
    removeUser: async (parent, { userId }) => {
      try {
        const removedUser = await User.findByIdAndRemove(userId);
        if (!removedUser) {
          throw new Error("User not found.");
        }
        return removedUser;
      } catch (error) {
        throw new Error("Failed to remove user.");
      }
    },
    updateUser: async (parent, { username, email, password }, context) => {
      try {
        // Ensure the user is logged in and authorized to update their profile
        if (!context.user) {
          throw new Error("You need to be logged in to update your profile.");
        }
        // Find the user by ID and update the fields
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { username, email, password },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error("User not found.");
        }
        const token = signToken(updatedUser);
        return { token, updatedUser };
      } catch (error) {
        throw new Error("Failed to update user.");
      }
    },

    addEvent: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw new Error("You need to be logged in to add an event.");
        }
        // Add the username from the context to the args
        const newEvent = await Event.create({
          ...args,
          createdBy: context.user.username, // username is stored in context.user
        });

        return newEvent;
      } catch (error) {
        throw new Error("Failed to add event.");
      }
    },

    joinEvent: async (parent, args) => {
      const { eventId, userId } = args;
    
      try {
        // Find the event by eventId
        const event = await Event.findById(eventId);
    
        if (!event) {
          throw new Error("Event not found");
        }
    
        // Check if the user is already in the attendees list
        if (event.attendees.includes(userId)) {
          throw new Error("User is already attending this event");
        }
    
        // Add the user's ID to the attendees list
        event.attendees.push(userId);
        await event.save();
    
        // Update the user's events array
        const user = await User.findById(userId);
        user.events.push(eventId);
        await user.save();
    
        // Populate and return the updated event
        const populatedEvent = await Event.findById(eventId)
          .populate([{ path: 'attendees', strictPopulate: false }]);
          
        return populatedEvent;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    editEvent: async (parent, args) => {
      try {
        const { eventId, ...updateData } = args;

        // Find the event by its ID and update it
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
          new: true, // Return the updated event
        });

        if (!updatedEvent) {
          throw new Error("Event not found.");
        }

        return updatedEvent;
      } catch (error) {
        throw new Error("Failed to edit event.");
      }
    },
    deleteEvent: async (parent, { eventId }) => {
      try {
        const deletedEvent = await Event.findByIdAndRemove(eventId);
        if (!deletedEvent) {
          throw new Error("Event not found.");
        }
        return deletedEvent;
      } catch (error) {
        throw new Error("Failed to delete event.");
      }
    },


    /* addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    }, */
  },
};

module.exports = resolvers;
