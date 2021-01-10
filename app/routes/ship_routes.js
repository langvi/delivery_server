module.exports = app => {
  const productCtr = require("../controller/product_controller.js");
  const login = require("../controller/login_controller.js");
  const customer = require("../controller/customer_controller.js");
  const employee = require("../controller/employee_controller.js");

  var router = require("express").Router();
  // for product 
  router.post("/addProduct/", productCtr.create);
  router.get("/getInfor/", productCtr.inforProduct);

  router.post("/enterProduct/", productCtr.enterProducts);

  router.get("/getAllProduct/", productCtr.findAll);
  // router.get("/published", tutorials.findAllPublished);

  router.get("/getProduct/:id", productCtr.findOne);

  router.put("/updateProduct/:id", productCtr.update);

  router.delete("/deleteProduct/:id", productCtr.delete);

  // router.delete("/", tutorials.deleteAll);

  // for login
  router.post("/addAccount/", login.create);

  router.get("/getAccounts/", login.findAll);
  // for customer
  router.get("/getProductCustomer/", customer.findProductByCustomer);

  router.get("/getAllCustomer/", customer.findAllCustomer);

  // for employee 
  router.get("/getAllEmployee/", employee.findAll);
  router.get("/getDetailEmployee/", employee.findDetailEmployee);
  router.get("/findProductByTime/", employee.findProductsByTime);



  app.use('/api', router);
};