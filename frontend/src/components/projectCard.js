import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactCountryFlag from "react-country-flag"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const URL = "http://localhost:5000/";
const collaborators = URL + "contributors/";

const ProjectCard = ({ project: { id, name, description, owner } }) => {

    const [project, setProject] = useState({
        id: id,
        name: name,
        description: description,
        owner: owner,
        contributors: []
    });

    const [contributors, setContributors] = useState([]);

    const [viewProject, setViewProject] = useState(false);

    const getContributors = async () => {
        try {
            const res = await fetch(collaborators, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                })
            });
            const data = await res.json();
            console.log(data);
            // sort data by time zone difference in ascending order 
            data.sort((a, b) => a.time_zone_difference - b.time_zone_difference);
            setContributors(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleClose = () => setViewProject(false);
    const handleShow = () => {
        getContributors();
        setViewProject(true);
    }

    return (
        <>
            <Card className="mt-4 col-md-3 " style={{ width: '18rem' }}>
                <Card.Body>
                    <Button className="nextButton rounded-pill font mb-2" onClick={handleShow} size="sm">
                        {project.name}
                    </Button>
                    <Card.Subtitle className="mb-2 text-muted">Description:</Card.Subtitle>
                    <Card.Text>
                        {project.description}
                    </Card.Text>
                    <ListGroup className="list-group-flush backgr">
                        <ListGroup.Item className="">Owner: {project.owner}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Modal className="font" show={viewProject} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Contributors:</h4>
                    {contributors?.length > 0 ? (
                        <div className='container'>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>City</th>
                                        <th>Country</th>
                                        <th>Time Difference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contributors.map((contributor) => (<>
                                        <tr>
                                            <td>{contributor.username}</td>
                                            <td>{contributor.location.city}</td>
                                            <td>{contributor.location.countryCode}</td>
                                            <td>{!contributor.time_zone_difference ? "0+" : contributor.time_zone_difference} hours</td>
                                        </tr>
                                    </>))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No contributors found</h2>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProjectCard;