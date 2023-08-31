import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_EVENT } from '../utils/queries';
import { Box, Image, Heading, Text } from '@chakra-ui/react';

const SingleEvent = () => {
  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: { eventId: eventId },
  });
  const event = data?.event || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column', md: 'column' }}
      my={3}
      border="1px solid lightgray"
      borderRadius="md"
      overflow="hidden"
      maxW={{ base: '100%', md: '800px' }} // Responsive width
      margin="0 auto" // Center align
    >
      {/* Image */}
      <Image
        src={event.image}
        alt={event.title}
        maxH="300px"
        flex={{ base: 'none', md: 1 }} // Image takes full width on mobile, 1/3 width on desktop
        objectFit="cover"
        order={{ base: -1, md: 0 }} // Set the order for responsive display
      />
      {/* Event Details */}
      <Box p="4" flex={{ base: 1, md: 2 }}>
        <Heading as="h3" size="lg" mb="2">
          About the Event
        </Heading>
        <Heading as="h4" size="lg" mb="2">
        <strong>Event Title:</strong>  {event.title}
        </Heading>
        <Text fontSize="lg" mb="2">
          {event.description}
        </Text>
        <Text fontSize="lg" mb="2">
          <strong>Location:</strong> {event.location}
        </Text>
        <Text fontSize="lg" mb="2">
          <strong>Date:</strong> {event.start_date} to {event.end_date}
        </Text>
        <Text fontSize="lg" mb="2">
          <strong>Ticket Information:</strong> {event.ticketInformation}
        </Text>
        <Text fontSize="lg" mb="2">
        <strong>People Interested: </strong>{event.attendeesCount} 
        </Text>
      </Box>

      
    </Box>
  );
};

export default SingleEvent;
