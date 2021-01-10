const db = require("../models");
const Customer = db.Customer;
// const Product = db.Product;
exports.findProductByCustomer = async (req, res) => {
    const _id = req.query;
    try {
        var data = await Customer.findOne({ _id });
        if (data) {
            var productIds = data.products;
            var productEm = [];
            const Product = db.Product;
            for (var index = 0; index < productIds.length; index++) {
                var product = await Product.findById(productIds[index]);
                productEm.push(product);
            }
            res.send({
                message: "Thành công",
                isSuccess: true,
                data: productEm
            });
        }
        else {
            res.send({
                message: "Lỗi",
                isSuccess: false,
                data: null
            });
        }
    } catch (e) {
        res.send({
            message: "Lỗi",
            isSuccess: false,
            data: null
        });
    }
}
exports.findAllCustomer = (req, res) => {
    Customer.find().then(data => {
        if (!data) {
            res.send({
                message: "Thành công",
                isSuccess: true,
                data: data
            });
        }
    }).catch(error => {
        res.status(500).send({
            message:
                err.message || "Lỗi "
        });
    });
}
