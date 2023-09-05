# Epic Events

Epic Events is a collaborative MERN-stack single-page application designed to simplify event management. With a scalable MongoDB back end, a GraphQL API, and a user-friendly React front end, Epic Events empowers users to discover, join, and even create events effortlessly. 

## Table of Contents
- Features
- Deployed Heroku
- User Story
- Getting Started
- Usage
- The URL of the deployed application 
- Technologies
- Screenshots
- Contributors
- License

## Features
1. User Authentication: Secure user authentication using JSON Web Tokens (JWT) ensures data privacy and personalized experiences.

2. Event Listing: Explore a dynamic listing of upcoming events, complete with details, dates, locations, and the number of attendees.

3. Event Search: Easily find events by date, keyword, or location, streamlining the process of discovering interesting events.

4. Event Creation: Registered users can effortlessly create their events, adding event details, dates, locations, and descriptions.

5. Event Management: Manage your created events effortlessly. Update event details, track count of joined attendees, and even delete events when needed.

6. Epic Events uses integrating email to enhance user engagement with contact Admin option.For additional details on how email notifications work in Epic Events, please refer to the Email Integration Documentation: https://www.emailjs.com/docs/examples/reactjs/

6. Responsive Design using ChakraUI: Epic Events boasts a polished and responsive user interface, ensuring a seamless experience across devices.

7. Interactive UI: Enjoy a highly interactive interface that responds to user input, making event management a breeze.

## User Story

### User Story 1: As an Event Organizer, 

Acceptance Criteria:

1. When I log in to the platform as an event organizer, I should see an option to create a new event.
2. I should be able to provide details for the new event, including the event title, description, location, start date, end date, and ticket information.
3. I should be able to upload an event image to make the event visually appealing.
4. After filling in the event details and clicking the "Create Event" button, the event should be created and visible to others.

### User Story 2: As an Attendee, I Want to Browse and Search for Events

Acceptance Criteria:

1. As an attendee, I should be able to view a list of upcoming events on the platform's homepage.
2. I should be able to filter and search for events based on criteria such as event title, location, or date.
3. When I click on an event, I should be able to see detailed information about the event, including its description, date, location, and ticket information.
4. If I find an event interesting, I should be able to join it.

## Getting Started

To run Epic Events locally, follow these steps:

1. Clone the Repository: Clone this repository to your local machine using git clone.

2. Install Dependencies: Navigate to the project's root directory and run npm install to install the necessary dependencies.

3. Set Up MongoDB: Ensure you have MongoDB installed and running. Configure the connection in the appropriate files.

4. Start the Backend: Run npm start to start the Express.js server.

5. Start the Frontend: Navigate to the client directory and run npm start to launch the React front end.

6. Explore: Open your browser and visit http://localhost:3000 to explore Epic Events locally.

## Usage

- User Registration: Create an account to access all features. If you already have an account, simply log in.

- Event Discovery: Browse through the event listings to discover exciting events. Use the search functionality to narrow down your options.

- Event Creation: If you want to host an event, click on the "Create Event" option. Fill in the event details, and your event will be live for others to discover.

- Event Management: For events you've created, you can easily manage them. Edit event details and remove events as needed.

## The URL of the deployed application  
- https://stormy-beyond-49418-a6aaf45881b7.herokuapp.com/

## Technologies
- Frontend: React
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose ODM
- GraphQL: Used for queries and mutations
- Authentication: JSON Web Tokens (JWT)
- Deployment: Heroku
- Styling: CSS, Chakra UI

## Screenshots
<img width="1440" alt="Screenshot1" src="https://github.com/Anju0806/EpicEvents/assets/126565826/86a2506f-d458-457a-8059-d50f537eb8da">
<img width="1440" alt="Screenshot2" src="https://github.com/Anju0806/EpicEvents/assets/126565826/3cc26e78-3be7-44da-9c7a-7768e03e03ac">
<img width="1440" alt="Screenshot3" src="https://github.com/Anju0806/EpicEvents/assets/126565826/55c6ad7b-20c2-4914-af93-e15235cc6a6b">
<img width="1440" alt="Screenshot4" src="https://github.com/Anju0806/EpicEvents/assets/126565826/5ebf8e3e-66d5-462d-b344-3c2222dfc3d9">


## License
This project is licensed under the MIT License.

## Questions
If you have any questions about the repo, please open an issue or contact me at anjualfino@gmail.com. 


