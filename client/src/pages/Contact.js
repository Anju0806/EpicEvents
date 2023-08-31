

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Box, Heading, Textarea, Input, Button, Text } from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const { loading, data } = useQuery(QUERY_ME);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .sendForm('service_oulp9q6', 'template_mrih84w', event.target, 'IkTrdLieRYa2rNf96')
      .then(
        (result) => {
          console.log(result.text);
          setSubmissionStatus('success');
        },
        (error) => {
          console.log(error.text);
          setSubmissionStatus('error');
        }
      );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box 
     display="flex"
    justifyContent="center"
    alignItems="center">
    <Box width="100%"
    maxWidth="650px"
    padding="4"
    border="1px solid lightgray"
    borderRadius="md"
    mt={4} >
      <Box bg="#EACB9F"  p="2" rounded="md" fontWeight="bold">
          <h3 className="card-header text-black">Contact Us</h3>
        </Box>
      <form onSubmit={handleSubmit}>
        <Box mb="4">
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Box>

        <Box mb="4">
          <label htmlFor="message">Message:</label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </Box>

       
        <Button 
              type="submit"
              mt="3"
              w="100%">
              Submit
            </Button>
      </form>

      {submissionStatus === 'success' && (
        <Text color="green.500" mt="4">
          Message sent successfully!
        </Text>
      )}

      {submissionStatus === 'error' && (
        <Text color="red.500" mt="4">
          Message not sent. Please try again later.
        </Text>
      )}
    </Box>
    </Box>
  );
};

export default Contact;

