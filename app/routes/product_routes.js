module.exports = app => {
  const productCtr = require("../controller/product_controller.js");

  var router = require("express").Router();

  router.post("/addProduct/", productCtr.create);

  router.get("/getProducts/", productCtr.findAll);

  // router.get("/published", tutorials.findAllPublished);

  router.get("/getProduct/:id", productCtr.findOne);

  router.put("/updateProduct/:id", productCtr.update);

  router.delete("/deleteProduct/:id", productCtr.delete);

  // router.delete("/", tutorials.deleteAll);

  app.use('/api', router);
};