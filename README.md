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
2. Start server
   - cd backend
   - npm run dev
3. Start frontend
   - cd frontend
   - npm start


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
