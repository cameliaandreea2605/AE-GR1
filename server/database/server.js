const { Sequelize } = require("sequelize");
const models = require("./models");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/db.sqlite",
  logging: false,
});

sequelize
  .sync()
  .then(() => {
    console.log("Models successfully (re)created.");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { sequelize, models };