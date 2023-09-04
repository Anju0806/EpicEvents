import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_EVENT } from '../utils/queries';
import { UPDATE_EVENT } from '../utils/mutations';
import FileBase64 from 'react-file-base64';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Heading
} from '@chakra-ui/react';
import Auth from '../utils/auth';
const UpdateEvent = () => {
  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: {
      eventId: eventId,
    },
  });

  const [updateEvent, { error, data:dataUpdated }] = useMutation(UPDATE_EVENT);

  const [updatedEvent, setUpdatedEvent] = useState({
    /* title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    ticketInformation: '',
    image: null, */
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      image: file,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("updatedEvent::",updatedEvent)
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
  // Check if the user is not logged in and navigate to the home page
  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }



  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Box
        backgroundColor={"#F7F8F8"}
        width="100%"
        maxWidth="650px"
        padding="4"
        border="1px solid lightgray"
        borderRadius="md"
        mt={4}
      >
        {dataUpdated ? (
          <p>
            Success! The event has been updated.{' '}
            <Link to="/">Back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleSubmit}>

            <Box bg="#EACB9F" p="2" rounded="md" fontWeight="bold" display="flex" alignItems="center" justifyContent="center">
              <h3 className="card-header text-black">Update the Event</h3>
            </Box>



            <FormControl mb="3" isRequired>
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                name="title"
                defaultValue={event.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="3" isRequired>
              <FormLabel>Description:</FormLabel>
              <Textarea
                name="description"
                defaultValue={event.description}
                onChange={handleInputChange}
              />
            </FormControl >
            <FormControl mb="3" isRequired>
              <FormLabel>Location:</FormLabel>
              <Input
                type="text"
                name="location"
                defaultValue={event.location}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="3" isRequired>
              <FormLabel>Start Date:</FormLabel>
              {event.start_date}
              <Input
                placeholder="Event Start Date"
                name="start_date"
                type="date"
                value={dayjs(event.start_date).format("YYYY-MM-DD")}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </FormControl>
            <FormControl mb="3" isRequired>
              <FormLabel>End Date:</FormLabel>
              <Input
                placeholder="Event End Date"
                name="end_date"
                type="date"
                value={dayjs(event.end_date).format("YYYY-MM-DD")}
                onChange={handleInputChange}
                min={dayjs(event.start_date).format("YYYY-MM-DD")}
              />
            </FormControl>
            <FormControl mb="3" isRequired>
              <FormLabel>Ticket Information:</FormLabel>
              <Input
                placeholder="Ticket Information"
                name="ticketInformation"
                type="text"
                defaultValue={event.ticketInformation}
                onChange={handleInputChange}
              />
            </FormControl>
            {/* <FormControl mb="3" >
              <FormLabel>Event Image:</FormLabel>
              <Input
                type="file"
                name="image" 
                onChange={handleImageChange} 
              />
            </FormControl> */}
             <FormLabel>Event Image</FormLabel>
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                setUpdatedEvent({ ...updatedEvent, image: base64 })
                }
              />

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
            {/* <text>Error: Not Updated, Please try again</text> */}
             {error.message} 
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UpdateEvent;
