// build your `/api/resources` router here
const Resources = require("./model");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  Resources.getResources()
    .then((resources) => res.status(200).send(resources))
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Server failed to get list of resources";
      next(err);
    });
});

router.post("/", checkBody, (req, res, next) => {
  const resource = req.resource;
  Resources.addResource(resource)
    .then(async (newId) => {
      try {
        const [newResource] = await Resources.getResource(newId);
        res.status(201).send(newResource);
      } catch (err) {
        err.statusCode = 500;
        err.message = "Failed to add a new resource.";
        next(err);
      }
    })
    .catch((err) => {
      err.statusCode = 500;
      err.message = "Failed to add a new resource.";
      next(err);
    });
});

function checkBody(req, res, next) {
  const resource = req.body;

  if (!resource || !resource.resource_name) {
    const err = new Error();
    err.statusCode = 400;
    err.message = "Resource should exist and must have a unique name";
    next(err);
  } else {
    req.resource = resource;
    next();
  }
}

module.exports = router;
