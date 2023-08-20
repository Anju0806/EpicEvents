const { AuthenticationError } = require('apollo-server-express');
const { User, Event, Stall, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    //user queries
    users: async () => {
      return User.find().populate('events stalls');
    },
    userByUsername: async (parent, { username }) => {
      return User.findOne({ username }).populate('events stalls');
    },
    userByEmail: async (parent, { email }) => {
      return User.findOne({ email }).populate('events stalls');
    },

    //event queries
    events: async (parent, args) => {
      /*   const params = username ? { username } : {}; */
      return Event.find(params).sort({ createdAt: -1 }).populate('events stalls ');
    },
    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId }).populate('createdBy stalls attendees');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('events stalls');
      }
      throw new AuthenticationError('You need to be logged in!');
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

    addEvent: async (parent, args,context) => {
      try {
        if (!context.user) {
          throw new Error("You need to be logged in to add an event.");
        }
        // Add the username from the context to the args
        const newEvent = await Event.create({
          ...args,
          createdBy: context.user.username, // Assuming username is stored in context.user
        });

        return newEvent;
      } catch (error) {
        throw new Error("Failed to add event.");
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
