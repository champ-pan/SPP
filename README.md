# Short Programming Project: Visualize collaboration among developers worldwide

This project aims to visualize collaboration between developers worldwide, by creating a graphical representation that shows how 
programmers from different locations can collaborate on group projects. The main focus of this application is to provide a visual representation of the 
location of the collaborators of your projects. Also, it provides the time difference between your current location and the location of each collaborator.

## Features

- Create a user by entering your GitHub username
- Log in to the database by entering your GitHub username
- Create projects by entering your GitHub username
- Display all your projects (name, description, owner)
- Display all collaborators of each project (username, location and time difference)

## Technologies Used

- Node.js, Express.js and Javascript for the backend
- React.js, CSS and Javascript for the frontend
- MongoDB for the database

## Installation

1. Clone the repository: https://github.com/champ-pan/SPP.git
2. Make sure to create an authorization token on GitHub to change mine in the backend/controller/contributor.js and backend/controller/user.js
   
   `const octokit = new Octokit({
    auth: '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'
   })`
   
4. Start server
   - `cd backend`
   - `npm run dev`
   If you get an error like Module Not Found make sure you have installed the dependencies mentioned below with the command `npm install [name of the dependency]`

   `"dependencies": {
    "@octokit/rest": "^20.0.2",
    "async": "^3.2.5",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "gh": "^2.8.9",
    "mongodb": "^6.3.0",
    "mongoose": "^8.0.4",
    "octokit": "^3.1.2",
    "smee": "^0.2.0"
  }`
5. Start frontend
   - `cd frontend`
   - `npm start`
     If you get an error like Module Not Found make sure you have install the dependencies mention below with the command `npm install [name of the dependency]`
  
   `"dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.15.6",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.9.2",
    "react-country-flag": "^3.1.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }`


## Usage

- When you run the application you first see a sign-up/login page
- If it is your first time using the application enter your GitHub username and press the sign-up/login button to create your user in the database
- By creating your user you also store your projects in the database
- If it is not your first time do the same thing as above but now you will log in
- On the next page you will see all your GitHub projects, your username and your self-reported location (if any)
- Every project has attributes the name of the project, a description and the owner of this project.
- You can browse through your projects by pressing the name of the project of your choice
- A modal will appear with all of your project's contributors (if any)
- The modal contains the username of the contributor the location (city, county) (if any) and the time difference between their location and your location
