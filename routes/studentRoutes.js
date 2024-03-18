const express = require("express");

const studentController = require(`${__dirname}/../controller/studentController`);
const router = express.Router();

router
  .route("/")
  .get(studentController.getStudent)
  .post(studentController.createStudent);

router
  .route("/:id")
  .get(studentController.getStudentByID)
  .delete(studentController.deleteStudentByID)
  .patch(studentController.updateStudentByID);
module.exports = router;
