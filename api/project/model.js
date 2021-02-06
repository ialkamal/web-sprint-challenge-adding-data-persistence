// build your `Project` model here
const db = require("../../data/dbConfig");

function getProjects() {
  return db("projects");
}

function getProject(id) {
  return db("projects").where({ project_id: id });
}

function addProject(project) {
  return db("projects").insert(project);
}

module.exports = { getProjects, getProject, addProject };
