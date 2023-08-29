
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_EVENT } from '../utils/queries'; // Replace with your actual update mutation
import { UPDATE_EVENT } from '../utils/mutations';

const UpdateEvent = () => {
  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: {
      eventId: eventId
    },
  });

  const [updateEvent] = useMutation(UPDATE_EVENT);

   const [updatedEvent, setUpdatedEvent] = useState({
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    ticketInformation: '',
    // image: null
  }); 
 /*  const [updatedEvent, setUpdatedEvent] = useState({
    title: updatedEvent.title,
    description: event.description,
    location: event.location,
    start_date: event.start_date,
    end_date: event.end_date,
    ticketInformation: event.ticketInformation,
    image: null
  }); */
  

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
          eventInput: updatedEvent, // Sending the updatedEvent state here
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const event = data?.event || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("EVENT", event);
  

  return (
    <div className="my-3">
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Update Event</h5>
            
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                // value={updatedEvent.title}
                defaultValue={event.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                //value={updatedEvent.description}
                defaultValue={event.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                //value={updatedEvent.location}
                defaultValue={event.location}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Start Date and Time:</label>
              <input
                className="form-input"
                placeholder="Event Start Date"
                name="start_date"
                type="date"
                //value={updatedEvent.start_date}
                defaultValue={event.start_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>End Date:</label>
              <input
                className="form-input"
                placeholder="Event End Date"
                name="end_date"
                type="date"
                value={updatedEvent.end_date}
                onChange={handleInputChange}
                min={event.start_date}
              />
            </div>
            
            <div className="form-group">
              <label>Ticket Information:</label>
              <input
                className="form-input"
                placeholder="Ticket Information"
                name="ticketInformation"
                type="text"
                value={updatedEvent.ticketInformation}
                onChange={handleInputChange}
              />
            </div>

           {/*  <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const selectedImage = event.target.files[0];

                    if (selectedImage) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        const base64Image = e.target.result;
                        setFormState({
                          ...formState,
                          image: base64Image,
                        });
                      };

                      reader.readAsDataURL(selectedImage);
                    }
                  }}
                /> */}
            
            <button type="submit">Update Event</button>
          </div>
        </div>
      </form>
    </div>
  );
  
};

export default UpdateEvent;
