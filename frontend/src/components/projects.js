import React from 'react';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Project = (params) => {

    const [project, setProject] = useState({
        id: params.project.id,
        name: params.project.name,
        description: params.project.description,
        owner: params.project.owner,
        contributors: params.project.contributors
    });

    return (
        <>
            <div>
                <h1>{project.name}</h1>
                <h4>Owner: {project.owner}</h4>
                <h4>Description: {project.description}</h4>
                {project.contributors?.length > 0 ? (
                    <div className='container'>
                        {project.contributors.map((project) => (
                            <h4>Contributor: {project}</h4>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No projects found</h2>
                    </div>
                )}
            </div>
        </>
    );
}

export default Project;