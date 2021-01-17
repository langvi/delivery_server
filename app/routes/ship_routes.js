module.exports = app => {
  const productCtr = require("../controller/product_controller.js");
  const login = require("../controller/login_controller.js");
  const authMiddle = require("../helper/auth_middleware.js");
  const auth = require("../controller/auth_controller.js");
  const customer = require("../controller/customer_controller.js");
  const employee = require("../controller/employee_controller.js");

  var router = require("express").Router();
  // for login
  router.post("/login/", auth.login, authMiddle.isAuth);



  // router.get("/getAccounts/", login.findAll);

  // for product 
  router.post("/addProduct/", authMiddle.isAuth, productCtr.create);

  router.get("/getInfor/", authMiddle.isAuth, productCtr.inforProduct);

  router.post("/enterProduct/", authMiddle.isAuth, productCtr.enterProducts);

  router.get("/getAllProduct/", authMiddle.isAuth, productCtr.findAll);

  router.get("/getInforCustomer/", authMiddle.isAuth, productCtr.getInforCustomer);

  router.get("/getInforProductByTime/", authMiddle.isAuth, productCtr.getInforProductByTime);
  // router.get("/getInforProductByTime/", productCtr.getInforProductByTime);
  // router.get("/published", tutorials.findAllPublished);

  router.get("/getProduct/:id", authMiddle.isAuth, productCtr.findOne);

  router.put("/updateProduct/:id", authMiddle.isAuth, productCtr.update);

  router.delete("/deleteProduct/:id", authMiddle.isAuth, productCtr.delete);

  // router.delete("/", tutorials.deleteAll);


  // for customer
  router.get("/getProductCustomer/", authMiddle.isAuth, customer.findProductByCustomer);

  router.get("/getAllCustomer/", authMiddle.isAuth, customer.findAllCustomer);
  router.put("/updateCustomer/:id", authMiddle.isAuth, customer.updateCustomer);

  // for employee 
  router.get("/getAllEmployee/", authMiddle.isAuth, employee.findAll);
  router.get("/getDetailEmployee/", authMiddle.isAuth, employee.findDetailEmployee);
  router.get("/findProductByTime/", authMiddle.isAuth, employee.findProductsByTime);
  router.put("/updateEmployee/:id", authMiddle.isAuth, employee.updateEmployee);



  app.use('/api', router);
};