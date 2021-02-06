// build your `Task` model here
const db = require("../../data/dbConfig");

async function getTasks() {
  const tasks = await db
    .select(
      "tasks.task_id",
      "tasks.task_description",
      "tasks.task_notes",
      "tasks.task_completed",
      "projects.project_name",
      "projects.project_description"
    )
    .from("tasks")
    .join("projects", "tasks.project_id", "=", "projects.project_id");

  return tasks.map((task) => {
    return {
      ...task,
      task_completed: task.task_completed == 0 ? false : true,
    };
  });
}

async function getTask(id) {
  const [task] = await db("tasks").where({ task_id: id });
  return {
    ...task,
    task_completed: task.task_completed == 0 ? false : true,
  };
}

function addTask(task) {
  return db("tasks").insert(task);
}

module.exports = { getTasks, getTask, addTask };
