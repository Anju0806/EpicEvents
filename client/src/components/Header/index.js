import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Heading, useBreakpointValue } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the cross icon
import Auth from '../../utils/auth';

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // State to track whether the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu's open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Use breakpoint value to determine if it's a small screen
  const isSmallScreen = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false });

  return (
    <Flex bg="#38714B" p={0} color="white" alignItems="center" justifyContent="space-between">
      <Box p="2">
        <Link to="/">
          <Heading size="md">Epic Events</Heading>
        </Link>
      </Box>
      {/* Display the hamburger menu only on small screens */}
      {isSmallScreen && (
        <Box display={['block', 'block', 'none']} p="2">
          {/* Toggle icon (hamburger or cross) */}
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            style={{ cursor: 'pointer' }}
            size="lg"
            onClick={toggleMenu} // Toggle the menu when clicked
          />
        </Box>
      )}
      {/* Navigation links */}
      {isSmallScreen ? (
        <Box
          display={isMenuOpen ? 'block' : 'none'}
          bg="#38714B"
          color="white"
          position="absolute"
          top="58px"
          left="0"
          right="0"
          zIndex="1"
          textAlign="center"
        >
          <Text p="2">
            <Link to="/contact">Contact</Link>
          </Text>
          {Auth.loggedIn() ? (
            <>
              <Text p="2">
                <Link to="/me">{Auth.getProfile().data.username}'s profile</Link>
              </Text>
              <Text p="2">
                <Link color="teal.500" to="/addEvent">
                  Create Event
                </Link>
              </Text>
              <Text p="2">
                <Link color="teal.500" to="/" onClick={logout}>
                  Logout
                </Link>
              </Text>
            </>
          ) : (
            <>
              <Text p="2">
                <Link color="teal.500" to="/login">
                  Login
                </Link>
              </Text>
              <Text p="2">
                <Link color="teal.500" to="/signup">
                  Signup
                </Link>
              </Text>
            </>
          )}
        </Box>
      ) : (
        <Flex alignItems="center">
          <Text p="2">
            <Link to="/contact">Contact</Link>
          </Text>
          {Auth.loggedIn() ? (
            <Flex>
              <Text p="2">
                <Link to="/me">{Auth.getProfile().data.username}'s profile</Link>
              </Text>
              <Text p="2">
                <Link color="teal.500" to="/addEvent">
                  Create Event
                </Link>
              </Text>
              <Text p="2">
                <Link color="teal.500" to="/" onClick={logout}>
                  Logout
                </Link>
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Text p="2">
                <Link color="teal.500" to="/login">
                  Login
                </Link>
              </Text>
              <Text p="2">
                <Link color="teal.500" to="/signup">
                  Signup
                </Link>
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
