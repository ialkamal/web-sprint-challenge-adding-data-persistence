// build your `/api/tasks` router here
const Tasks = require("./model");
const Projects = require("../project/model");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  Tasks.getTasks()
    .then((tasks) => res.status(200).send(tasks))
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Server failed to get list of tasks";
      next(err);
    });
});

router.post("/", checkBody, (req, res, next) => {
  const task = req.task;
  Tasks.addTask(task)
    .then(async (newId) => {
      try {
        const [newTask] = await Tasks.getTask(newId);
        res.status(201).send(newTask);
      } catch (err) {
        err.statusCode = 500;
        err.message = "Failed to add a new task.";
        next(err);
      }
    })
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Failed to add a new task.";
      next(err);
    });
});

async function checkBody(req, res, next) {
  const task = req.body;

  if (!task || !task.task_name || !task.project_id) {
    const err = new Error();
    err.statusCode = 400;
    err.message =
      "Tasks should exist and must have a name and refers to a project";
    next(err);
  } else {
    try {
      const [project] = await Projects.getProject(task.project_id);

      if (!project || project.length === 0) {
        const err = new Error();
        err.statusCode = 404;
        err.message = "Project with that id doesn't exist!";
        next(err);
      } else {
        req.task = task;
        next();
      }
    } catch (err) {
      err.statusCode = 500;
      err.message = "Failed to get project.";
      next(err);
    }
  }
}

module.exports = router;
