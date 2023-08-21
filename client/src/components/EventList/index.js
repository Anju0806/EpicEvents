import React from 'react';
import { Link } from 'react-router-dom';

const EventList = ({
  events,
  title,
  showTitle = true,
  showCreatedBy = true,
}) => {
  if (!events.length) {
    return <h3>No Events Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {events &&
        events.map((event) => (
          <div key={event._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showCreatedBy ? (
                <Link
                  className="text-light"
                  to={`/profiles/${event.createdBy}`}
                >
                   {event.title} 
                  <span style={{ fontSize: '1rem' }}>
                  <br />
                    {event.title} - {event.start_date} to {event.end_date}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You created this event on {event.createdAt}
                  </span>
                </>
              )} 
            </h4>
            <div className="card-body bg-light p-2">
              <p>{event.description}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/events/${event._id}`}
            >
              View Details
            </Link>
          </div>
        ))}
    </div>
  );
};

export default EventList;
