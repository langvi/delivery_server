const db = require("../models");
const Employee = db.Employee;
exports.findAll = (req, res) => {
    Employee.find({}, { name: 1, phoneNumber: 1, avatarUrl: 1 })
        .then(data => {
            res.send({
                message: "Thành công",
                isSuccess: true,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Lỗi lấy tất cả sản phẩm"
            });
        });

};
exports.findDetailEmployee = (req, res) => {
    const _id = req.query;
    Employee.where('_id').equals(_id)
        .then(data => {
            res.send({
                message: "Thành công",
                isSuccess: true,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Lỗi"
            });
        });

};
exports.findProductsByTime = async (req, res) => {
    const _id = req.query;
    var data = await Employee.findOne({_id});
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
            message: "Không tìm thấy shipper",
            isSuccess: false,
            data: null
        });
    }

}