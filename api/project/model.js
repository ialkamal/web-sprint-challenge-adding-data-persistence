// build your `Project` model here
const db = require("../../data/dbConfig");

async function getProjects() {
  const projects = await db("projects");
  return projects.map((project) => {
    return {
      ...project,
      project_completed: project.project_completed === 0 ? false : true,
    };
  });
}

async function getProject(id) {
  const project = await db("projects").where({ project_id: id });
  return {
    ...project,
    project_completed: project.project_completed === 0 ? false : true,
  };
}

function addProject(project) {
  return db("projects").insert(project);
}

module.exports = { getProjects, getProject, addProject };
