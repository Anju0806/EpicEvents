import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations'; // Replace with your mutation import

const AddEvent = (props) => {
  const [formState, setFormState] = useState({ //usestate is for data to re-render in the page
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    ticketInformation: '',
    image: null
  });
  const [addEvent, { error, data }] = useMutation(ADD_EVENT);
  const handleChange = (event) => {
    const { name, value } = event.target;//get the name of the input field and the value of input field
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
      image: null
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Add Event</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! The event has been added.{' '}
                <Link to="/">Back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Event Name"
                  name="title"
                  type="text"
                  value={formState.title}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  placeholder="Event Description "
                  onChange={handleChange}
                  value={formState.description}></textarea >
                <input
                  className="form-input"
                  placeholder="Event Start Date"
                  name="start_date"
                  type="date"
                  value={formState.start_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                <input
                  className="form-input"
                  placeholder="Event End Date"
                  name="end_date"
                  type="date"
                  value={formState.end_date}
                  onChange={handleChange}
                  min={formState.start_date}
                />
                <input
                  className="form-input"
                  placeholder="Location"
                  name="location"
                  type="text"
                  value={formState.location}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="ticketInformation"
                  name="ticketInformation"
                  type="text"
                  value={formState.ticketInformation}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const selectedImage = event.target.files[0];
                    setFormState({
                      ...formState,
                      image: selectedImage,
                    });
                  }}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Add Event
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

export default AddEvent;
