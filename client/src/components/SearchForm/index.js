import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
   Input ,
   Flex,
   Button, ButtonGroup
} from '@chakra-ui/react'
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

      <FormControl as='fieldset'>
      <FormLabel htmlFor='email'>Search for event</FormLabel>
      <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
       <label htmlFor="search">Keyword:</label> 
        <Input  
          id="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        
     
      
        <label htmlFor="searchdate">Date:</label>
        <Input 
          type="date"
          id="searchdate"
          value={searchdate}
          onChange={(e) => setsearchdate(e.target.value)}
        />
      
     
        <label htmlFor="location">Location:</label>
        <Input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
     
      <Button type="submit" minWidth="100px">Search</Button>
      </Flex>
      </FormControl>
    </form>
  );
};

export default SearchForm;
