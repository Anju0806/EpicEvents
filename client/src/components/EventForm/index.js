
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack } from '@chakra-ui/react';
import { ADD_EVENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    ticketInformation: '',
    image: '',
  });

  const [addEvent] = useMutation(ADD_EVENT);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addEvent({
        variables: {
          ...formData,
        },
      });

      // Clear form data
      setFormData({
        title: '',
        description: '',
        location: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        ticketInformation: '',
        image: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FormControl>          
          <Button type="submit" colorScheme="blue">
            Add Event
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EventForm;
