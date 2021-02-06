// build your `/api/projects` router here
const Projects = require("./model");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.getProjects()
    .then((projects) => res.status(200).send(projects))
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Server failed to get list of projects";
      next(err);
    });
});

router.post("/", checkBody, (req, res, next) => {
  const project = req.project;
  Projects.addProject(project)
    .then(async (newId) => {
      try {
        const [id] = newId;
        const newProject = await Projects.getProject(id);
        res.status(201).send(newProject);
      } catch (err) {
        err.statusCode = 500;
        err.message = "Failed to add a new project.";
        next(err);
      }
    })
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Failed to add a new project.";
      next(err);
    });
});

function checkBody(req, res, next) {
  const project = req.body;

  if (!project || !project.project_name) {
    const err = new Error();
    err.statusCode = 400;
    err.message = "Project should exist and must have a name";
    next(err);
  } else {
    req.project = project;
    next();
  }
}

module.exports = router;
