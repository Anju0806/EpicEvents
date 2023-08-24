import React, { useState,useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Link as ChakraLink, Button, Image } from '@chakra-ui/react';
import { JOIN_EVENT } from '../../utils/mutations'; // Replace with your mutation import
import Auth from '../../utils/auth';

const EventList = ({
  events,
  title,
  showTitle = true,
  showCreatedBy = true,

}) => {
  const [joinEvent] = useMutation(JOIN_EVENT);
  const user_id = Auth.getProfile().data._id;
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);

  const handleJoinEvent = async (eventId) => {
    try {
      const { data } = await joinEvent({
        variables: { eventId },
      });

      if (data && data.joinEvent.success) {
        console.log('Event joined successfully');
        setUserAttendingEvents([...userAttendingEvents, eventId]);
        console.log("setUserAttendingEvents ",userAttendingEvents)
      } else {
        console.log('Failed to join event');
      }
    } catch (error) {
      if (error.message.includes('User is already attending this event')) {
        console.log('You are already attending this event');
      } else {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    //  trigger whenever the state changes, updating the button's disabled state.
    console.log("useeffect: ",userAttendingEvents)
  }, [userAttendingEvents]);
  

  // State to keep track of events the user has joined
  const [joinedEvents, setJoinedEvents] = useState([]);

  if (!events.length) {
    return <Heading as="h3">No Events Yet</Heading>;
  }

  return (
    <Box>
      {showTitle && <Heading as="h3">{title}</Heading>}
      {events &&
        events.map((event) =>{
          const isUserAttending = event.attendees.some(attendee => attendee._id === user_id);
          console.log("isUserAttending:", isUserAttending);

          console.log("Event ID:", event._id);
          console.log("event.attendees:", event.attendees);
          console.log(Auth.getProfile().data._id);
         return(

          <Box
            key={event._id}
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="md"
            p="4"
            mb="4"
            display="flex"
            alignItems="center"
          >
            {event.img}
            <Image
              src={event.image}
              alt={event.title}
              boxSize="100px"
              mr="4"
            />

            <Box flex="1">
              <Heading as="h4" size="md" mb="2">
                {showCreatedBy ? (
                  <ChakraLink
                    as={Link}
                    to={`/profiles/${event.createdBy}`}
                    color="blue.500"
                  >
                    {event.title}
                  </ChakraLink>
                ) : (
                  <>
                    <Text fontSize="sm">
                      You created this event on {event.createdAt}
                    </Text>
                  </>
                )}
              </Heading>
              <Text mb="2">
                {event.start_date} to {event.end_date}
              </Text>
              <Text fontSize="md" mb="2">
                {event.description}
              </Text>
              <Button as={Link} to={`/events/${event._id}`} colorScheme="blue" mr="2">
                View Details
              </Button>

              <Button
                as={Link}
                to={`/joinEvent/${event._id}`}
                colorScheme="blue"
                
                onClick={() => {

                 /*  const isUserAttending = event.attendees.some(attendee => attendee._id === user_id);
                  console.log("isUserAttending:", isUserAttending);

                  console.log("Event ID:", event._id);
                  console.log("event.attendees:", event.attendees);
                  console.log(Auth.getProfile().data._id); */

                  if (!isUserAttending) {
                    handleJoinEvent(event._id);
                  }
                }}
                disabled={isUserAttending}
              >
                {isUserAttending ? "Joined" : "Join Event"}
              </Button>


            </Box>
          </Box>
        )}
        )}
    </Box>
  );
};

export default EventList;
