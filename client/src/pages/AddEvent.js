import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations'; // Replace with your mutation import

const AddEvent = (props) => {
  const [formState, setFormState] = useState({
    eventName: '',
    eventDate: '',
    // Add other event-related form fields here
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
        variables: { ...formState },
      });

      // Handle any success action, such as redirecting to a page
      // or displaying a success message

    } catch (e) {
      console.error(e);
    }

    // Clear form values
    setFormState({
      eventName: '',
      eventDate: '',
      // Clear other event-related form fields here
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
                  name="eventName"
                  type="text"
                  value={formState.eventName}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Event Date"
                  name="eventDate"
                  type="date"
                  value={formState.eventDate}
                  onChange={handleChange}
                />
                {/* Add other event-related form fields here */}
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
