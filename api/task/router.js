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

router.post("/", checkBody, async (req, res, next) => {
  const task = req.task;

  Tasks.addTask(task)
    .then((newId) => {
      const [id] = newId;
      console.log("id: ", id);
      Tasks.getTask(id)
        .then((newTask) => {
          console.log("NEW: ", newTask);
          res.status(201).send(newTask);
        })
        .catch((err) => {
          console.log(err);
          err.statusCode = 500;
          err.message = "Failed to add a new task.";
          next(err);
        });
    })
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Failed to add a new task.";
      next(err);
    });
});

async function checkBody(req, res, next) {
  const task = req.body;

  if (!task || !task.task_description || !task.project_id) {
    const err = new Error();
    err.statusCode = 400;
    err.message =
      "Tasks should exist and must have a name and refers to a project";
    next(err);
  } else {
    try {
      const project = await Projects.getProject(task.project_id);

      if (!project) {
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
