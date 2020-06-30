module.exports = app => {
  const participants = require("../controllers/participant.controller.js");

  let router = require("express").Router();

  // Create a new participant
  router.post("/", participants.create);

  // Retrieve all published participants
  router.get("/", participants.findAll);

  // Retrieve all participants
  router.get("/participants", participants.findAllParticipation);


  // Retrieve a single participant with id
  router.get("/:id", participants.findOne);

  // Update a participant with id
  router.put("/:id", participants.update);

  // Delete a participant with id
  router.delete("/:id", participants.delete);

  app.use('/api/participants', router);
};
