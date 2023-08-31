import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      events {
      _id
      
    }
    }
  }
`;
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      isAdmin
      events {
      _id
      title
      description
      location
      createdAt
      start_date
      end_date
      start_time
      ticketInformation
      end_time
      image
      attendeesCount
      attendees{
      _id 
    }
    }
    }
  }
`;
export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      title
      description
      location
      createdAt
      start_date
      end_date
      start_time
      ticketInformation
      end_time
      image
      attendeesCount
      attendees{
      _id 
    }
    }
  }
`;

export const QUERY_SINGLE_EVENT = gql`
  query getSingleEvent($eventId: ID!) {
    event(eventId: $eventId){
      _id
      title
      description
      location
      createdAt
      start_date
      end_date
      start_time
      ticketInformation
      end_time
      image
      attendeesCount
      attendees{
      _id 
    }
    }
  }
`;




export const QUERY_SEARCH_EVENTS = gql`
  query getSearchEvents($search:String, $searchdate: String, $location: String) {
    searchevents(search:$search,searchdate:$searchdate,location:$location) {
      _id
      title
      description
      location
      createdAt
      start_date
      end_date
      start_time
      ticketInformation
      end_time
      image
      attendeesCount
      attendees{
      _id 
    }
    }
  }
`;
