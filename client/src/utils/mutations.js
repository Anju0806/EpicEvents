import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_EVENT = gql`
mutation addEvent($eventInput:EventInput)
  {
    addEvent(eventInput:$eventInput)
      {
        _id
        title 
        description 
        location 
        start_date 
        end_date 
        start_time 
        end_time 
        ticketInformation 
        createdBy{
          username
          _id
        }
        createdAt 
        image 
        attendees{
          username
          _id
        }
      }
   }
`;
export const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      attendees {
        username
        _id
      }
    }
  }
`;


export const UPDATE_EVENT = gql`
  mutation updateEvent($eventId: ID!, $eventInput: EventInput!) {
    updateEvent(eventId: $eventId, eventInput: $eventInput) {
      _id
      title
      description
      location
      start_date
      end_date
      start_time
      end_time
      ticketInformation
      createdBy {
        username
        _id
      }
      createdAt
      image
      attendees {
        username
        _id
      }
    }
  }
`;


