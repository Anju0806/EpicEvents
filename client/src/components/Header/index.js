import { React, useState } from 'react';
import { Link } from 'react-router-dom';
//import { Flex, Box, Text, Button, Spacer, Heading } from '@chakra-ui/react';
//import { Flex, Box, Text, Button, Spacer, Heading, IconButton } from '@chakra-ui/react'; // Import the Icon component
import { Flex, Box, Text, Button, Spacer, Heading } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

import Auth from '../../utils/auth';

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();                            
  };
/*   const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }; */


  return (
    <Flex bg="#38714B" p={0} color="white" minWidth='max-content' alignItems='center' gap='2' >
      <Box p='2'>
        <Link to="/">
          <Heading size='md' >Epic Events</Heading>
        </Link>
      </Box>
      <Spacer />
      <Box>
{/* <div><HamburgerIcon /></div> */}
      

       {/*  <Button
          display={['block', 'block', 'none']}
          onClick={toggleMenu} >
          {showMenu ? <CloseIcon /> : <HamburgerIcon />} 
        </Button>
 */}

      </Box>
      <Flex
        direction={['column', 'row']} // Column on small screens, row on larger screens
        display={['none', 'flex', 'flex']} // Hide on small screens, show on larger screens
        alignItems={['center', 'center', 'flex-end']} // Adjust alignment
      >
        <Text >
          <Link  to="/contact">
            Contact
          </Link>
        </Text>
        {Auth.loggedIn() ? (
          <Flex >
            <Text >
              <Link  m='2' to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
            </Text>
            <Text>
              <Link color='teal.500' to="/addEvent">
                Create Event
              </Link>
            </Text>
            <Text >
              <Link color='teal.500' to="/" onClick={logout}>
                Logout
              </Link>
            </Text>

          </Flex>
        ) : (
          <Flex>
            <Text>
              <Link color='teal.500' to="/login">
                Login
              </Link>
            </Text>
            <Text>
              <Link color='teal.500' to="/signup">
                Signup
              </Link>
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
