import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import EventList from '../components/EventList';
import { Link } from 'react-router-dom';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        <div className="col-12 col-md-10 mb-5">
          <h3>Profile Details:</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
        {/* Display User's Events */}
        <div className="col-12 col-md-10 mb-5">
          
          {user.events.length === 0 ? (
            <p>No events created by {user.username}.</p>
          ) : (
            <EventList events={user.events} updateable={true} title={`${user.username}'s events...`} />
          )}
        </div>

       {/*  <div className="col-12 col-md-10 mb-5">
          <EventList
            events={user.events}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          />
          
        </div> */}
       {/* Display Event Form */}
       {!userParam && (
            
            <Link to="/addevent">Create a new Event</Link>
          
        )}
      </div>
    </div>
  );
};

export default Profile;
