const dbConfig = require("../config/db_config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {
    mongoose : mongoose,
    url : dbConfig.url,
    Product: require("./product.js")(mongoose),
    User: require("./user.js")(mongoose),
    Customer:  require("./customer.js")(mongoose),
    Employee:  require("./employee.js")(mongoose),
    ShipArea: require("./ship_area.js")(mongoose)

};
module.exports = db;