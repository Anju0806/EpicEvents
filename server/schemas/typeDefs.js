const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
    events:[Event]
    stalls:[Stall]
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
  max_stalls: Int
  createdBy: User
  createdAt: String
  image: String
  stalls: [Stall]
  attendees: [User]
  attendeesCount: Int  # Virtual property
  upcomingEvents: [Event]  # Virtual property
}

  type Product {
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {

    users: [User]
    userByUsername(username: String!): User
    userByEmail(email: String!): User

    events: [Event]!
    event(eventId:ID!):Event
    userevents(userId:ID!):[Event] #returns all joined events of a user

    stalls: [Stall]
    eventstalls(eventId:ID!):[Stall]
    userstalls(owner:ID!):[Stall] #returns all stalls of an owner
    stall(stallId:ID!):Stall

    products: [Product]
    product(productName: String!): Product
    productById(productId: ID!): Product
    productstall(stallId:ID!):[Product]
    productevent(eventId:ID!):[Product]

    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateUser(username: String!, email: String!, password: String): Auth

    addEvent(
      title: String!,
      description: String!,
      location: String!,
      start_date: String!,
      end_date: String!,
      start_time: String!,
      end_time: String!,
      ticketInformation: String!,
      max_stalls: Int!,
      createdBy: ID!
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
      max_stalls: Int
    ): Event

    deleteEvent(eventId: ID!): Event

    addStall(
      title: String!,
      description: String!,
      number: String!,
      contact_number: String!,
      owner: ID!
    ): Stall

    editStall(
      title: String,
      description: String,
      number: String,
      contact_number: String,
      owner: ID
    ): Stall

    deleteStall(stallId: ID!): Stall
    deleteEventStall(stallId: ID!, eventId: ID!): Event

    addProduct(name: String!, description: String!): Product
    editProduct(name: String!, description: String): Product
    deleteStallProduct(productId: ID!, stallId: ID!): Product
  }

`;

module.exports = typeDefs;
