import React from 'react';
import { useQuery } from '@apollo/client';

import EventList from '../components/EventList';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  return (
    <main>
      <div className="flex-row justify-center">
      
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
             < EventList
              events={events}
              title="Join the Event(s)..."
            />  
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
