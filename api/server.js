// build your server here
const express = require("express");
const server = express();
const projectRouter = require("./project/router");
const resourceRouter = require("./resource/router");
const taskRouter = require("./task/router");

server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/resources", resourceRouter);
server.use("/api/tasks", taskRouter);

server.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: error.message, stack: error.stack });
});

module.exports = server;
