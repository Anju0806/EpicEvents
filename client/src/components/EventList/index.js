import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Link as ChakraLink, Button, Image } from '@chakra-ui/react';

const EventList = ({
  events,
  title,
  showTitle = true,
  showCreatedBy = true,
}) => {
  if (!events.length) {
    return <Heading as="h3">No Events Yet</Heading>;
  }

  return (
    <Box>
      {showTitle && <Heading as="h3">{title}</Heading>}
      {events &&
        events.map((event) => (
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
              <Button as={Link} to={`/joinevent/${event._id}`} colorScheme="blue">
                Join Event
              </Button>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default EventList;
