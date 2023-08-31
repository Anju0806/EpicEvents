import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_EVENT } from '../utils/queries';
import { UPDATE_EVENT } from '../utils/mutations';
import {
  Box,
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Heading
} from '@chakra-ui/react';

const UpdateEvent = () => {
  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: {
      eventId: eventId,
    },
  });

  const [updateEvent, { error, updatedata }] = useMutation(UPDATE_EVENT);

  const [updatedEvent, setUpdatedEvent] = useState({
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    ticketInformation: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateEvent({
        variables: {
          eventId: eventId,
          eventInput: updatedEvent,
        },
      });
      console.log('Dataaaaa', data);
    } catch (error) {
      console.error(error);
    }
  };

  const event = data?.event || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Box
        width="100%"
        maxWidth="650px"
        padding="4"
        border="1px solid lightgray"
        borderRadius="md"
        mt={4}
      >
        {updatedata ? (
          <p>
            Success! The event has been updated.{' '}
            <Link to="/">Back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleSubmit}>

<Box bg="#EACB9F" p="2" rounded="md" fontWeight="bold" display="flex" alignItems="center" justifyContent="center">
  <h3 className="card-header text-black">Update the Event</h3>
</Box>



            <FormControl mb="3">
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                name="title"
                defaultValue={event.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel>Description:</FormLabel>
              <Textarea
                name="description"
                defaultValue={event.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel>Location:</FormLabel>
              <Input
                type="text"
                name="location"
                defaultValue={event.location}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel>Start Date and Time:</FormLabel>
              <Input
                placeholder="Event Start Date"
                name="start_date"
                type="date"
                defaultValue={event.start_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel>End Date:</FormLabel>
              <Input
                placeholder="Event End Date"
                name="end_date"
                type="date"
                defaultValue={event.end_date}
                onChange={handleInputChange}
                min={event.start_date}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel>Ticket Information:</FormLabel>
              <Input
                placeholder="Ticket Information"
                name="ticketInformation"
                type="text"
                defaultValue={event.ticketInformation}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button 
              type="submit"
              mt="3"
              w="100%">
              Update Event
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
  );
};

export default UpdateEvent;
