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

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;
export const ADD_EVENT = gql`
mutation addEvent($title: String!,$description: String!,$location: String!,$start_date: String!,$end_date: String!,$start_time: String!,$end_time: String!,$ticketInformation: String!,$image: String)
  {
    addEvent(title:$title,description:$description, location:$location,start_date:$start_date, end_date:$end_date,start_time:$start_time, end_time:$end_time,ticketInformation:$ticketInformation, image:$image )
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
        createdBy
        createdAt 
        image 
        attendees
      }
   }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
