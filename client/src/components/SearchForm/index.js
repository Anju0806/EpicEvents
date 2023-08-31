import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Box,
  Center
} from '@chakra-ui/react';

const SearchForm = ({ onSearch }) => {
  const [search, setsearch] = useState('');
  const [searchdate, setsearchdate] = useState('');
  const [location, setlocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search, searchdate, location);
  };

  return (
    <Box
      bg="#F5E3CB"
      p={6}
      borderRadius="lg" // Add rounded corners
      mt={4} // Add margin space above the form
      mb={12}
    >
      <form onSubmit={handleSearch}>
        <FormControl as="fieldset">
          <FormLabel htmlFor="email" >
          <Center h="70px" fontWeight="bold">
              <Box
                fontSize="xl" // Increase font size
                color="#38714B" // Apply a custom color
                textAlign="center" // Center align the text
              >
                Discover Events Happening in Your City
              </Box>
            </Center>
          </FormLabel>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <label htmlFor="search">Keyword:</label>
            <Input variant='filled' 
              id="search"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />

            <label htmlFor="searchdate">Date:</label>
            <Input variant='filled' 
              type="date"
              id="searchdate"
              value={searchdate}
              onChange={(e) => setsearchdate(e.target.value)}
            />

            <label htmlFor="location">Location:</label>
            <Input variant='filled' 
              type="text"
              id="location"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
            />

            <Button type="submit" minWidth="100px">
              Search
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};

export default SearchForm;
