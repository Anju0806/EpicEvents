import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import EventList from '../components/EventList';
import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <Box>
        <Heading as="h4" mb="4">
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </Heading>
      </Box>
    );
  }

  return (
    <Box display="flex"
      justifyContent="center"
      alignItems="center">
      <Box
        width="100%"
        maxWidth="1000px"
        padding="4"
        border="1px solid lightgray"
        borderRadius="md"
        mt={4}
      >

        <Box mb={5} >
          <Box bg="#EACB9F" p="2" rounded="md" fontWeight="bold" display="flex">
            <h3 className="card-header text-black">Profile Details</h3>
          </Box>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
        </Box>
        {/* Display User's Events */}
        <Box >
          {user.events.length === 0 ? (
            <Text>No events created by {user.username}.</Text>
          ) : (
            <EventList
              events={user.events}
              updateable={true}
              // title={`Viewing events created by ${user.username}` }
              title={<Box bg="#EACB9F" p="2" rounded="md" fontWeight="bold" display="flex" >
                <h3 className="card-header text-black">Events Created by {user.username}</h3>
              </Box>}
            />
          )}
        </Box>

        {/* Display Event Form */}
      </Box>
    </Box>
  );
};

export default Profile;
