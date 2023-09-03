import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Heading, Badge, Image, Box, Button, Center } from '@chakra-ui/react';
import { JOIN_EVENT, DELETE_EVENT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { SimpleGrid } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarker } from '@fortawesome/free-solid-svg-icons';

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

            return (
              <Box
                backgroundColor={"#F7F8F8"}
                key={event._id}
                maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'
                display='flex'
                flexDirection='column'
                alignItems='start'
              >
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
                    {event.attendeesCount > 0 && (
                      <Badge
                        colorScheme='yellow'
                        position='absolute'
                        top='0'
                        right='0'
                        mr='2'
                        mt='2'
                        borderRadius='50%'
                        p='2'
                      >
                        <FontAwesomeIcon icon={faStar} color='gold' />
                        <span style={{ marginLeft: '5px' }}>{event.attendeesCount} joined</span>
                      </Badge>
                    )}
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
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: 'bold'
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <span>{event.title}</span>
                      </Box>
                    </div>
                  </div>
                </Link>

                <Box p='5' flex='1'>
                  <Link to={`/event/${event._id}`}>
                    <Box
                      color='gray.600'
                      fontWeight='bold'
                      letterSpacing='wide'
                      fontSize='xs'
                      textTransform='uppercase'
                      alignSelf='start'

                    >
                      {event.start_date} to {event.end_date}
                    </Box></Link>
                  {/* <Box>
                    <FontAwesomeIcon icon={faMapMarker} style={{ marginRight: '5px', color: '#D0B88A' }} />
                    {event.location}
                    <Box as='span' color='gray.600' fontSize='sm'></Box>
                  </Box> */}
                  <a
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(event.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box _hover={{ color: '#38714B' }}>
                      <FontAwesomeIcon icon={faMapMarker} style={{ marginRight: '5px', color: '#D0B88A', transition: 'color 0.3s',}} />
                      {event.location}
                      <Box as='span' color='gray.600' fontSize='sm'></Box>
                    </Box>
                  </a>


                  {!updateable &&
                    <Box
                      onClick={() => {
                        if (!isUserAttending) {
                          handleJoinEvent(event._id);
                        }
                      }}
                      disabled={isUserAttending}
                      display="flex"
                      alignItems="center"
                      color={isUserAttending ? 'Grey' : '#A5761E'}
                      cursor="pointer" // Add cursor pointer on hover
                      transition="color 0.2s"
                      _hover={{ color: isUserAttending ? '#A5761E' : '#38714B' }} // Change color on hover
                    >
                      <FontAwesomeIcon icon={faStar} style={{ marginRight: '5px', color: 'Gold 700' }} />
                      <span>{isUserAttending ? "Joined" : "Join Event"}</span>
                    </Box>

                  }
                </Box>
                {/* {updateable && <Button width="100%" mb={'0.5'} as={Link} to={`/updateevent/${event._id}`} 
                 colorScheme="orange" _hover={{ colorScheme: "gray" }}>
                  Update Event
                </Button>} */}
                {updateable && (
                  <Button
                    width="100%"
                    mb="0.5"
                    as={Link}
                    to={`/updateevent/${event._id}`}
                    color="black" // Button text color
                    bg="#EACB9F"    // Button background color
                    _hover={{
                      color: "white", // Text color on hover
                      bg: "#38714B",    // Background color on hover
                    }}
                  >
                    Update Event
                  </Button>
                )}


                {/* {updateable &&
                 <Button width="100%" 
                 color="gray.600" // Button text color
                 bg="#EACB9F"    // Button background color
                 _hover={{
                  color: "black", // Text color on hover
                   bg: "red",    // Background color on hover
                 }}
                  onClick={() => {
                    handleDeleteEvent(event._id);
                  }}
                >
                  Delete Event</Button>} */}
                {updateable && (
                  <Button
                    width="100%"
                    color="gray !important" // Button text color
                    bg="#EACB9F !important"    // Button background color
                    _hover={{
                      color: "white !important", // Text color on hover
                      bg: "#CB442C !important",    // Background color on hover
                    }}
                    onClick={() => {
                      handleDeleteEvent(event._id);
                    }}
                  >
                    Delete Event
                  </Button>
                )}

              </Box>
            )
          }
          )}
      </SimpleGrid>
    </Box>
  );
};

export default EventList;
