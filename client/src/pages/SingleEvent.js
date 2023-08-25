import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_EVENT } from '../utils/queries';

const SingleEvent = () => {
  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    variables: { eventId: eventId },
  });
  //console.log(data);
  const event = data?.event || {};
  console.log(event);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <div className="card">
        <img src={event.image} className="card-img-top" alt={event.title} />
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">{event.description}</p>
          <p className="card-text">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="card-text">
            <strong>Date:</strong> {event.start_date} to {event.end_date}
          </p>
          <p className="card-text">
            <strong>Time:</strong> {event.start_time} - {event.end_time}
          </p>
          <p className="card-text">
            <strong>Ticket Information:</strong> {event.ticketInformation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
