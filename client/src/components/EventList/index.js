import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Heading, Text, Link as ChakraLink, Button, Image, Box } from '@chakra-ui/react';
import { JOIN_EVENT, DELETE_EVENT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { SimpleGrid } from '@chakra-ui/react'


const EventList = ({
  events,
  title,
  showTitle = true,
  showCreatedBy = true,
  triggerRefresh,
  updateable,

}) => {
  const [joinEvent] = useMutation(JOIN_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const navigate = useNavigate();

  let user_id = null;
  if (Auth.loggedIn()) {
    const profile = Auth.getProfile();
    user_id = profile.data._id;
  }

  // State to keep track of events the user has joined
  const [joinedEvents, setJoinedEvents] = useState(false);

  useEffect(() => {
    //  trigger whenever the state changes, updating the button's disabled state.
  }, [joinedEvents]);
  const handleDeleteEvent = async (eventId) => {
    try {
      const { data } = await deleteEvent({
        variables: { eventId },
      });

      if (data) {
        console.log('Event deleted successfully');
        triggerRefresh();
      } else {
        console.log('Failed to delete event');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleJoinEvent = async (eventId) => {
    try {
      if (!Auth.loggedIn()) {
        return navigate("/login", { replace: true });
      }
      const { data } = await joinEvent({
        variables: { eventId },
      });

      if (data) {
        setJoinedEvents(true);
        console.log('Event joined successfully');
        triggerRefresh();
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

  if (!events.length) {
    return <Heading as="h3">No Events Yet</Heading>;
  }


  return (
    <Box>
      {showTitle && <Box >{title}</Box>}

      <SimpleGrid columns={[1, 2, 3]} spacingX='40px' spacingY='25px' >
        {events &&
          events.map((event) => {
            const isUserAttending = event.attendees.some(attendee => attendee._id === user_id);
            // console.log(Auth.getProfile().data._id);
            return (
              <Box
                backgroundColor={"#F7F8F8"}
                key={event._id}
                maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'
                display='flex'
                flexDirection='column'
                alignItems='start'
              >

                {/* <Link to={`/event/${event._id}`}>
                  <Image
                    height={60}
                    objectFit='cover'
                    src={event.image}
                    alt={event.title}
                  />
                </Link> */}
                <Link to={`/event/${event._id}`}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                    }}
                  >
                    <Image
                      height={60}
                      objectFit='cover'
                      src={event.image}
                      alt={event.title}
                      borderRadius='6px'
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        left: '3px',
                        padding: '10px',
                        paddingRight: '50px',
                        textAlign: 'left',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        zIndex: '1',
                        display: 'inline-block', // Allow the background to fit the title
                        whiteSpace: 'nowrap', // Prevent line breaks
                        overflow: 'hidden', // Hide overflow if the title is too long
                        textOverflow: 'ellipsis', // Show ellipsis (...) for long titles
                      }}
                    >
                      {event.title}
                    </div>
                  </div>
                </Link>



                <Box p='6' flex='1'>
                  <Box
                    color='gray.500'
                    fontWeight='semibold'
                    letterSpacing='wide'
                    fontSize='xs'
                    textTransform='uppercase'
                    alignSelf='start'
                    mb='1'
                  >
                    {event.start_date} to {event.end_date}
                  </Box>
                  {/* <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    isTruncated
                  >
                   {event.start_date} to {event.end_date}
                  </Box> */}
                  <Box>
                    {event.location}
                    <Box as='span' color='gray.600' fontSize='sm'></Box>
                  </Box>
                  <Box display='flex' mt='2' alignItems='center'>
                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                      {event.attendeesCount} joined
                    </Box>
                  </Box>
                  {/* {!updateable &&
                    <Button as={Link} to={`/event/${event._id}`} colorScheme="#38714B" color="black" mr="2">
                      View Details
                    </Button>
                  } */}
                  {!updateable &&
                    <Button

                      onClick={() => {
                        if (!isUserAttending) {
                          handleJoinEvent(event._id);
                        }
                      }}
                      disabled={isUserAttending}
                    >
                      {isUserAttending ? "Joined" : "Join Event"}
                    </Button>
                  }
                  {updateable && <Button as={Link} to={`/updateevent/${event._id}`} colorScheme="blue" mr="2">
                    Update Event
                  </Button>}
                  {updateable && <Button
                    colorScheme="red" // red color for delete
                    onClick={() => {
                      handleDeleteEvent(event._id);
                    }}
                  >
                    Delete Event
                  </Button>}
                </Box>
              </Box>

            )
          }
          )}
      </SimpleGrid>
    </Box>
  );
};

export default EventList;





