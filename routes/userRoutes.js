const express = require("express");

console.log(`${__dirname}/../controller/userController`);
const userController = require(`${__dirname}/../controller/userController`);
const router = express.Router();

router.route("/").get(userController.getUser).post(userController.createUser);
module.exports = router;
