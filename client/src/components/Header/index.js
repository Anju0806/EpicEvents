 
import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Button } from '@chakra-ui/react';

import Auth from '../../utils/auth';

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (

    <Flex bg="blue.500" color="white" p={4} alignItems="center" padding={50} >
      <Box p='2'>
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold" m={0}>
            Epic Events
          </Text>
        </Link>
      </Box>
      <Flex ml="auto" flexDirection="column">
        <Flex flexDirection="row">
          <Box mr={3}>
            <Link to="/contact">
              <Text fontSize="lg" color="blue.200">
                Contact
              </Text>
            </Link>
          </Box>
          <Text fontSize="lg" color="blue.200">
            |
          </Text>
          <Box mr={4} ml={3}>
            <Link to="/search">
              <Text fontSize="lg" color="blue.200">
                Search
              </Text>
            </Link>
          </Box>
        </Flex>
        {Auth.loggedIn() ? (
          <Flex flexDirection="row">
            <Box mr={4}>
            <Link to="/me" mx={2}>
              <Text fontSize="lg" color="blue.200">
                {Auth.getProfile().data.username}'s profile
              </Text>
            </Link>
            </Box>
            <Box mr={4}>
              <Link to="/addEvent" mx={2}>
              <Text fontSize="lg" color="blue.200">
                Create Event
              </Text>
            </Link>
            </Box>
            <Link to="/" mx={2} onClick={logout}>
              <Text
                as="button"
                fontSize="lg"
                color="blue.200"
                _hover={{ textDecoration: 'underline' }}
              >
                Logout
              </Text>
            </Link>
            </Flex>
        ) : 
        
        (
          <Flex flexDirection="row">
            <Box mr={3} ml={5}>
              <Link to="/login" mx={2}>
                <Text fontSize="lg" color="blue.200">
                  Login
                </Text>
              </Link>
            </Box>
            <Text fontSize="lg" color="blue.200">
            |
          </Text>
            <Box mr={4} ml={3}>
              <Link to="/signup" mx={2}>
                <Text fontSize="lg" color="blue.200">
                  Signup
                </Text>
              </Link>
            </Box>
            </Flex>
        )}
      </Flex>
    </Flex>
    
  );
};

export default Navbar;
 