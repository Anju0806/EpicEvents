import React, { useState } from 'react';
//import { useQuery } from '@apollo/client';

const SearchForm = ({ onSearch }) => {
  const [search, setsearch] = useState('');
  const [searchdate, setsearchdate] = useState('');
  const [location, setlocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search, searchdate, location);
  };

  return (
    <form onSubmit={handleSearch}>
      <div>
        <label htmlFor="search">Event Title:</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="searchdate">Event Date:</label>
        <input
          type="date"
          id="searchdate"
          value={searchdate}
          onChange={(e) => setsearchdate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
