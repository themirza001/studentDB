module.exports.getUser = (req, res) => {
  res.status(200).send("User is fetched Suceesfully");
};

module.exports.createUser = (req, res) => {
  res.status(200).send("User is created Suceesfully");
};
