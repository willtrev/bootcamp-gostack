const express = require('express');

const server = express();
server.use(express.json());

const projects = [];
let reqCounter = 0;

function checkProjectExist (req, res, next){
  const { id } = req.params;
  const project = projects.find(project => project.id == id);

  if(!project){
    return res.status(404).send('Project does not exists'); 
  }

  return next();
}

server.use((req, res, next)=> {
  reqCounter++;
  console.log(`Requisicoes feitas: ${reqCounter}`);
  next();
});

server.post('/projects', (req,res)=>{
  const { id, title } = req.body;
  const project ={
    id,
    title,
    tasks: []
  }
  projects.push(project);

  return res.json(project);
});

server.get('/projects', (req,res)=>{
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExist, (req,res)=>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);
  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkProjectExist, (req,res)=>{
  const { id } = req.params;

  const indexProject = projects.findIndex(project => project.id == id);
  projects.splice(indexProject, 1);

  return res.send('Deletado');
});

server.post('/projects/:id/tasks', checkProjectExist, (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.tasks.push(title);

  return res.json(project);
});


server.listen(3000);