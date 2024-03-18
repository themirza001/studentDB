const express = require("express");

const userRouter = require(`${__dirname}/routes/userRoutes`);
const studentRouter = require(`${__dirname}/routes/studentRoutes`);

//used for loggin diff http routes
const morgan = require("morgan");
const app = express();
//used for fecthing and working on the datat from the user
app.use(express.json());

app.use(morgan("dev"));
//user defined middleWare
app.use((req, res, next) => {
  console.log("Hello from the MiddleWare👋🏼.");
  next();
});

// userRouter
//   .route("/")
//   .get(userController.getUser)
//   .post(userController.createUser);

// tourRouter
//   .route("/")
//   .get(tourController.getTour)
//   .post(tourController.createTour);

//mouting the routes on respestive router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/student", studentRouter);

module.exports = app;
