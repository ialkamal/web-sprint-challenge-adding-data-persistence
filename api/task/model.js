// build your `Task` model here
const db = require("../../data/dbConfig");

async function getTasks() {
  //   const tasks = await db("tasks");
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

  await console.log(tasks);
  return tasks.map((task) => {
    console.log(task.task_completed);
    return {
      ...task,
      task_completed: task.task_completed == 0 ? false : true,
    };
  });
}

async function getTask(id) {
  const [task] = await db("tasks").where({ task_id: id });
  console.log("TASK: ", task);
  return {
    ...task,
    task_completed: task.task_completed == 0 ? false : true,
  };
}

function addTask(task) {
  return db("tasks").insert(task);
}

module.exports = { getTasks, getTask, addTask };
