import User from '../models/user.js';
import { App } from "octokit";
import { Octokit } from '@octokit/rest';
import { createProject } from './projects.js';

const octokit = new Octokit({
    auth: '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'
})


export const createUser = async (req, res) => {

    try {
        const username = req.body.username;
        // console.log(username);

        //check if user already exists
        const userExists = await User.findOne({ username: username });
        if (userExists) {
            console.log("userExists")
            return res.status(200).json(userExists);
        }

        const { data: user } = await octokit.users.getByUsername({
            username,
        });

        if (user === undefined) {
            return res.status(404).json('Error: User not found.');
        }

        const { data: repositories } = await octokit.repos.listForUser({
            username
        });

        let projects = [];

        for (let i = 0; i < repositories.length; i++) {

            const project = {
                id: "",
                name: "",
                description: "",
                owner: "",
                contributors: []
            }

            project.id = repositories[i].id;
            project.name = repositories[i].name;
            project.description = repositories[i].description;
            project.owner = repositories[i].owner.login;

            const { data: contributors } = await octokit.repos.listContributors({
                owner: username,
                repo: repositories[i].name,
            });

            if (contributors !== undefined) {
                contributors.forEach(contributor => {
                    if (contributor.login !== project.owner) {
                        project.contributors.push(contributor.login);
                    }
                });

            }

            await createProject(project);
            projects.push(project);
        }

        const newUser = new User({
            id: user.id,
            username: user.login,
            location: user.location,
            projects: projects
        });

        newUser.save()
            .then(() => res.json(newUser))
            .catch(err => res.status(404).json('Error: ' + err));
    }
    catch (err) {
        console.log(err);
    }

}
