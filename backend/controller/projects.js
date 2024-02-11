import project from '../models/project.js';
export const getProjects = async (req, res) => {
  const username = req.body.username;
  // console.log("username:" + username);
  try{
    const Projects= await project.find({owner:(username)})
    res.status(200).json(Projects);
    // console.log(Projects);
  }catch(error){
    res.status(409).json({message:error.message});
  }
}

export const createProject = async (params) => {
  const id = params.id;
  const name = params.name;
  const description = params.description;
  const owner = params.owner;
  const contributors = params.contributors;

  //check if project already exists
  const projectExists = await project.findOne({ name: name });
  if (projectExists) return console.log('Project already exists');

  const newProject = new project({
    id,
    name,
    description,
    owner,
    contributors
  });

  newProject.save()
    .then(() => console.log('Project added!'))
    .catch(err => console.log('Error: ' + err));
}