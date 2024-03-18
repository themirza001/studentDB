const { findByIdAndUpdate } = require("../models/studentModels");

const Student = require(`${__dirname}/../models/studentModels`);

exports.getStudent = async (req, res) => {
  // res.status(200).send("Tour is fetched Suceesfully");
  try {
    console.log(req.query);
    let queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "field"];
    excludedFields.forEach((currEl) => delete queryObj[currEl]);
    console.log(req.query);
    console.log(queryObj);
    console.log("query Obj is:" + queryObj);
    //agar hum adv filtering karenge like gte,lte,lt,gt
    //toh usko obj chahiye aisa {gender:"Male",age:{'$gte':20}}
    //but req.query dega aisa {gender:"Male",age:{gte:20}},ie $ sign khud se phle add karna pdega
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //\b \b ka matlab sirf whi str ko karna,naki kisi str ke substr ko jisme ye 4 values ho, g ka matlab sare occurance ko karna hai
    queryObj = JSON.parse(queryStr);
    // console.log(queryObj);
    let query = Student.find(queryObj);

    if (req.query.sort) {
      // query = query.sort(req.query.sort);
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    //console.log()
    if (req.query.fields) {
      console.log(req.query.fields);
      const field = req.query.fields.split(",").join(" ");
      //console.log(field);
      query = query.select(field);
    } else {
      query = query.select("-__v");
    }

    const students = await query;

    res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newStudent,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getStudentByID = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.deleteStudentByID = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {},
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.updateStudentByID = async (req, res) => {
  try {
    const tour = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};
