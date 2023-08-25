const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
    events:[Event]
  }

  type Event {
  _id: ID
  title: String
  description: String
  location: String
  start_date: String
  end_date: String
  start_time: String
  end_time: String
  ticketInformation: String
  createdBy: User
  createdAt: String
  image: String
  attendees: [User]
  attendeesCount: Int  # Virtual property
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]  #user queries
    userByUsername(username: String!): User
    userByEmail(email: String!): User
   
    events: [Event]! #6 upcoming events returned
    event(eventId:ID!):Event
    searchevents( search:String!, searchdate: String!, location: String!) : [Event]!
    me: User  #returns all joined events of a user
  }
  input EventInput {
    title: String,
      description: String,
      location: String,
    start_date: String,
      end_date: String,
      start_time: String,
      end_time: String,
      ticketInformation: String,
      image: String
}
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateUser(username: String!, email: String!, password: String): Auth

    addEvent(eventInput: EventInput): Event

    joinEvent(
      eventId: ID! 
      ): Event

    editEvent(
      title: String,
      description: String,
      location: String,
      start_date: String,
      end_date: String,
      start_time: String,
      end_time: String,
      ticketInformation: String,
      
    ): Event
    deleteEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs






/* future development */

/* type Product {
_id: ID
name: String
description: String
}

type Stall {
_id: ID
title: String
description: String
createdAt: String
number:String
contact_number:String
image:String
owner:User
# events:[Event]!
products:[Product]!

} 

  stalls: [Stall]
  eventstalls(eventId:ID!):[Stall]
  userstalls(owner:ID!):[Stall] #returns all stalls of an owner
  stall(stallId:ID!):Stall

  products: [Product]
  product(productName: String!): Product
  productById(productId: ID!): Product
  productstall(stallId:ID!):[Product]
  productevent(eventId:ID!):[Product] */

/* addStall(title: String!,description: String!,number: String!,contact_number: String!,owner: ID): Stall
    editStall(title: String,description: String,number: String,contact_number: String,owner: ID): Stall
    deleteStall(stallId: ID!): Stall
    deleteEventStall(stallId: ID!, eventId: ID!): Event
    addProduct(name: String!, description: String!): Product
    editProduct(name: String!, description: String): Product
    deleteStallProduct(productId: ID!, stallId: ID!): Product 
     */