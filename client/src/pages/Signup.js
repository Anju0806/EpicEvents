import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Box, Input, Button, Text, Alert, AlertIcon } from '@chakra-ui/react';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={4}
    >
      <Box 
        width="100%"
        maxWidth="500px"
        padding="4"
        border="1px solid lightgray"
        borderRadius="md"
      >
        <Box bg="#EACB9F" p="2" rounded="md" fontWeight="bold" textAlign="center">
          <h3 className="card-header text-black">Sign Up</h3>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box mb="4">
            <label htmlFor="username">Your username:</label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
            />
          </Box>
          <Box mb="4">
            <label htmlFor="email">Your email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </Box>
          <Box mb="4">
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </Box>
          <Button colorScheme="blue" type="submit" w="100%">
            Submit
          </Button>
        </form>

        {error && (
          <Alert status="error" mt="4">
            <AlertIcon />
            {error.message}
          </Alert>
        )}

        {data && (
          <Text color="green.500" mt="4">
            Success! You may now head{' '}
            {/* <Link to="/">back to the homepage.</Link> */}
            back to the homepage.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Signup;
