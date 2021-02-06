// build your `Resource` model here
const db = require("../../data/dbConfig");

function getResources() {
  return db("resources");
}

async function getResource(id) {
  const [resource] = await db("resources").where({ resource_id: id });
  return resource;
}

function addResource(resource) {
  return db("resources").insert(resource);
}

module.exports = { getResources, getResource, addResource };
