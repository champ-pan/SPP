import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ProjectCard from './projectCard';
import Col from 'react-bootstrap/Col';
import { Paper } from '@mui/material';


const URL = "http://localhost:5000/";
const projectsURL = URL + "projects/";

const Home = (params) => {

    useEffect(() => {
        console.log(params);
    }
        , []);

    return (
        <>
            <div>
                <Paper elevation={5} className='nextButton'>
                    <div>
                        <h1 className='font'>Welcome {params.user.username} to your <br></br> Projects</h1>
                        <h4>Location: {params.user.location}</h4>
                    </div>
                </Paper>
            </div>
            <div style={
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }>
                {params.user.projects?.length > 0 ? (
                    <>
                        <Row xs={1} md={3} className="g-0 container">
                            {params.user.projects.map((project) => (
                                <Col className='ml-4'>
                                    <ProjectCard project={project} key={project.id} />
                                </Col>

                            ))}
                        </Row>
                    </>
                ) : (
                    <div className='empty'>
                        <h2>No projects found</h2>
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;