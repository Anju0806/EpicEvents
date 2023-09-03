import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { Box, Button, Input, Textarea, FormLabel, FormControl } from '@chakra-ui/react';
import FileBase64 from 'react-file-base64';

const AddEvent = (props) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    ticketInformation: '',
    image: null,
  });
  const [addEvent, { error, data }] = useMutation(ADD_EVENT);

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
      const { data } = await addEvent({
        variables: { eventInput: formState },
      });
    } catch (e) {
      console.error(e);
    }
    // Clear form values
    setFormState({
      title: '',
      description: '',
      location: '',
      start_date: '',
      end_date: '',
      ticketInformation: '',
      image: null,
    });
  };

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      
    >
      <Box textAlign="center" 
        width="100%"
        maxWidth="650px"
        padding="4"
        border="1px solid lightgray"
        borderRadius="md"
        mt={4}
        backgroundColor={"#F7F8F8"}
      >
        <Box bg="#EACB9F" color="white" p="2" rounded="md" fontWeight="bold">
          <h3 className="card-header text-black">Add Event Details</h3>
        </Box>
        <Box as="div" className="card-body">
          {data ? (
            <p>
              Success! The event has been added.{' '}
              <Link to="/">Back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
               <FormControl isRequired>
              <FormLabel htmlFor="title">Event Name</FormLabel>
              <Input
                id="title"
                placeholder="Event Name"
                name="title"
                type="text"
                value={formState.title}
                onChange={handleChange}
                mb="2"
              /></FormControl>
              <FormControl isRequired>
              <FormLabel htmlFor="description">Event Description</FormLabel>
              <Textarea
                id="description"
                placeholder="Event Description"
                name="description"
                value={formState.description}
                onChange={handleChange}
                mb="2"
              /></FormControl>
              <FormControl isRequired>
              <FormLabel htmlFor="start_date">Event Start Date</FormLabel>
              <Input
                id="start_date"
                placeholder="Event Start Date"
                name="start_date"
                type="date"
                value={formState.start_date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                mb="2"
              /></FormControl>
              <FormControl isRequired>
              <FormLabel htmlFor="end_date">Event End Date</FormLabel>
              <Input
                id="end_date"
                placeholder="Event End Date"
                name="end_date"
                type="date"
                value={formState.end_date}
                onChange={handleChange}
                min={formState.start_date}
                mb="2"
              /></FormControl>
              <FormControl isRequired>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                placeholder="Location"
                name="location"
                type="text"
                value={formState.location}
                onChange={handleChange}
                mb="2"
              /></FormControl>
              <FormControl isRequired>
              <FormLabel htmlFor="ticketInformation">Ticket Information</FormLabel>
              <Input
                id="ticketInformation"
                placeholder="Ticket Information"
                name="ticketInformation"
                type="text"
                value={formState.ticketInformation}
                onChange={handleChange}
                mb="2"
              /></FormControl>
              <FormLabel>Event Image</FormLabel>
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormState({ ...formState, image: base64 })
                }
              />

              <Button
                type="submit"
                mt="3"
                w="100%"
              >
                Add Event
              </Button>
            </form>
          )}
          {error && (
            <Box mt="3" p="3" bg="red.500" color="white">
              {error.message}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddEvent;
