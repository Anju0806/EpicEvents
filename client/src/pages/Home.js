
import React, { useState,useEffect } from 'react';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import EventList from '../components/EventList';
import SearchForm from '../components/SearchForm';
import { QUERY_EVENTS, QUERY_SEARCH_EVENTS } from '../utils/queries';

const Home = () => {
  const client = useApolloClient();
  const   [getEvents, {loading,error,data}] = useLazyQuery(QUERY_EVENTS,{
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });
  //const events = eventsData?.events || [];
  const [events,setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Add state for indicating search mode

  useEffect(() => {
  getEvents();
  }, [])
  useEffect(() => {
    console.log(data);
    if(data){

      setEvents(data.events);
    }
    }, [data])

  const handleSearch = async (search, searchdate, location) => {
    if (!search && !searchdate && !location) {
      return; // Do nothing if no input is provided
    }

    try {
      const { data } = await client.query({
        query: QUERY_SEARCH_EVENTS,
        variables: {
          search: search,
          searchdate: searchdate,
          location: location,
        },
      });
      const searchevents = data.searchevents || [];
      setFilteredEvents(searchevents);
      setIsSearching(true); // Set search mode to true
      console.log('searchevents:', searchevents);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };

  const handleBackToEvents = () => {
    setFilteredEvents([]); // Clear filtered events
    setIsSearching(false); // Set search mode to false
  };
  const refreshHandler = () => {
    getEvents(); // Clear filtered events
    console.log("triggered")
  };

  return (
    <main>
      <div className="flex-row justify-center">
         <div className="col-12 col-md-8 mb-3">
          <SearchForm onSearch={handleSearch} />
          {isSearching ? ( // Display either search results or original events list
            <div>
              <button onClick={handleBackToEvents}>Back to All Events</button>
              <EventList events={filteredEvents.length > 0 ? filteredEvents : events} title="Join the Event..." />
            </div>
          ) : (
            
            <EventList events={events} triggerRefresh={refreshHandler} title="Join the Events..." />
          )}
        </div> 
      </div>
    </main>
  );
};

export default Home;
