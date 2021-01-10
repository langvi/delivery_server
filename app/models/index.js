const dbConfig = require("../config/db_config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {
    mongoose : mongoose,
    url : dbConfig.url,
    Product: require("./product.js")(mongoose),
    login: require("./login.js")(mongoose),
    Customer:  require("./customer.js")(mongoose),
    Employee:  require("./employee.js")(mongoose)

};
// db.mongoose = mongoose;
// db.url = dbConfig.url;
// db.Product = require("./product.js")(mongoose);
// db.login = require("./login.js")(mongoose);

module.exports = db;