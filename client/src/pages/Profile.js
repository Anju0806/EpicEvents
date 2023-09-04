import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import EventList from '../components/EventList';
import { Box, Heading, Text } from '@chakra-ui/react';
import { QUERY_ME, QUERY_EVENTS_CREATED } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  
  // Fetch the user's data using QUERY_ME
  const { loading: loadingUser, data: userData } = useQuery(QUERY_ME);
  
  // Fetch events_created data using QUERY_EVENTS_CREATED
  const { loading: loadingEventsCreated, data: dataEventsCreated } = useQuery(QUERY_EVENTS_CREATED, {
    variables: { username: userParam },
  });

  if (loadingUser || loadingEventsCreated) {
    return <div>Loading...</div>;
  }

  const user = userData?.me || {};
  const created_events = dataEventsCreated?.getcreatorevents || {};
console.log("eventscreated",created_events)


  // Render user details
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        width="100%"
        maxWidth="1000px"
        padding="4"
        border="1px solid lightgray"
        borderRadius="md"
        mt={4}
      >
        <Box mb={5}>
          <Box bg="#EACB9F" p="2" rounded="md" fontWeight="bold" display="flex">
            <h3 className="card-header text-black">Profile Details</h3>
          </Box>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
        </Box>
        
        {/* Render events_created and events_joined data here */}
        {/* Render events_created */}
        {(created_events).length===0 ? (
          <Text>No events created by {user.username}.</Text>
        ) : (
          <EventList
            events={created_events}
            updateable={true} // Set this based on your requirements
            title={
              <Box bg="#EACB9F" p="2" rounded="md" fontWeight="bold" display="flex">
                <h3 className="card-header text-black">Events Created by {user.username}</h3>
              </Box>
            }
          />
        )}
        {/* Render events_joined */}
        {(user.events).length===0? (
          <Text>No events joined by {user.username}.</Text>
        ) : (
          <EventList
            events={user.events}
            updateable={false} // Set this based on your requirements
            title={
              <Box bg="#EACB9F" p="2" rounded="md" fontWeight="bold" display="flex">
                <h3 className="card-header text-black">Events Joined by {user.username}</h3>
              </Box>
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default Profile;
