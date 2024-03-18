const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 150, // Assuming maximum age of 150
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Assuming only three gender options
  },
  grade: {
    type: String,
    enum: ["A", "B", "C", "D", "F"], // Assuming grades from A to F
  },
  subjects: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length > 0; // Ensuring at least one subject is present
      },
      message: (props) => "At least one subject must be specified",
    },
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  contact: {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/, // Basic email validation regex
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{10}$/, // Basic phone number validation regex for 10-digit numbers
    },
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
