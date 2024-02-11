import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Home from './components/home';

const URL = "http://localhost:5000/";
const usersURL = URL + "user/";

const App = () => {

  const [next, setNext] = useState(false);

  const [username, setUsername] = useState("");

  const [user, setUser] = useState({
    username: "",
    location: "",
    projects: []
  });

  const [projects, setProjects] = useState([]);

  const validate = () => {
    if (username.length > 0) {
      getUsers();
      handleNext();
    } else {
      alert("Please enter a username");
    }
  }

  //make a request to send the username to the backend to create a user and get the user's data back
  const getUsers = async () => {
    try {
      const res = await fetch(usersURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username })
      });

      const data = await res.json();
      user.username = data.username;
      user.location = data.location;
      user.projects = data.projects;
    } catch (err) {
      console.log(err);
    }
  }

  const handleNext = () => {
    console.log(user);
    setTimeout(() => {
      setNext(true);
    }, 1000);
  }

  return (
    <>
      <div className='font mt-5'>
        {next ? <Home user={user}></Home> : <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
          }} className='font'>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </FloatingLabel>
            <Button className="nextButton rounded-pill" onClick={validate} size="md">
              Log In 
            </Button>
          </div>
        </>}
      </div>
    </>
  );
}

export default App;
