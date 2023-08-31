/* import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
 */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Box, Input, Button, Text } from '@chakra-ui/react';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
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
          <h3 className="card-header text-black">Login</h3>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Box mb="4">
            <label htmlFor="email">Your email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
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
              required
            />
          </Box>
          <Button colorScheme="blue" type="submit" w="100%">
            Submit
          </Button>
        </form>

        {data ? (
          <Text color="green.500" mt="4">
            Success! You may now head{' '}
            {/* <Link to="/">back to the homepage.</Link> */}
            back to the homepage.
          </Text>
        ) : (
          error && (
            <Text color="red.500" mt="4">
              {error.message}
            </Text>
          )
        )}
      </Box>
    </Box>
  );
};

export default Login;
