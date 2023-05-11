module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const attendance = require("../controllers/tutorial.controller.js");
  const fees = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  //Attendence of students
  router.post("/attendence", attendance.attendence);

  //Attendence of students of get
  router.get("/attendence/list", attendance.attendenceGetAll);
  //Attendence of students of get by one
  router.get("/attendence/:id", attendance.attendenceGetOne);
  //update
  router.put("/attendence/:id", attendance.attendenceupdate);

  router.get("/rollnumbers/list", tutorials.findAllRollNumbers);
  router.get("/classes/list", tutorials.findAllClassNames);
  router.get("/classes/section", tutorials.findAllSectionNames);
  router.post("/fee/collection", fees.feeCollectionCreate);
  router.get("/fee/list", fees.feeCollectionGetAll);

  app.use("/", router);
};
