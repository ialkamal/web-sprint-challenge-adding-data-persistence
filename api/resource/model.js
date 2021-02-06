// build your `Resource` model here
const db = require("../../data/dbConfig");

function getResources() {
  return db("resources");
}

function getResource(id) {
  return db("resources").where({ resource_id: id });
}

function addResource(resource) {
  return db("resources").insert(resource);
}

module.exports = { getResources, getResource, addResource };