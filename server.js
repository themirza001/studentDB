const app = require(`${__dirname}/app`);
const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/prctise", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => "DataBase Connection is Succesful");

mongoose
  .connect("mongodb://127.0.0.1:27017/practiseStudentDatabase", {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection is succesfulll"));

const port = 3001;
app.listen(port, (req, res) => {
  console.log(`server is live at port:${port}`);
});
