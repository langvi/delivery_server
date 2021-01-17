const db = require("../models");
const Customer = db.Customer;
// const Product = db.Product;
exports.findProductByCustomer = async (req, res) => {
    const _id = req.query;
    try {
        var data = await Customer.findOne({ _id });
        if (data) {
            var productIds = data.products;
            var listProduct = [];
            const Product = db.Product;
            for (var index = 0; index < productIds.length; index++) {
                var product = await Product.findById(productIds[index]);
                listProduct.push(product);
            }
            var totalGetting = 0;
            var totalShipping = 0;
            var totalShiped = 0;
            listProduct.forEach(element => {
                if (element.statusShip == 0 || element.statusShip == 2) {
                    totalGetting++;
                } else if (element.statusShip == 1 && element.isSuccess == false) {
                    totalShipping++;
                } else {
                    totalShiped++;
                }
            });
            res.send({
                message: "Thành công",
                isSuccess: true,
                data: {
                    products: listProduct,
                    totalCreate: listProduct.length,
                    totalGetting: totalGetting,
                    totalShipping: totalShipping,
                    totalShiped: totalShiped

                }
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
exports.findAllCustomer = async (req, res) => {
    var countCustomer = await Customer.count();
    Customer.find({}, { name: 1, phoneNumber: 1, avatarUrl: 1, address: 1 }).
        then(data => {
            res.send({
                message: "Thành công",
                isSuccess: true,
                data: {
                    customer: data,
                    totalCustomer: countCustomer
                }
            });
        }).catch(error => {
            res.status(500).send({
                message:
                    err.message || "Lỗi "
            });
        });
}
exports.updateCustomer = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Dữ liệu không được để trống"
        });
    }

    const id = req.params.id;

    Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Không thể cập nhật dữ liệu"
                });
            } else res.send({
                message: "Cập nhật thành công",
                isSuccess: true,
                data: null
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Có lỗi xảy ra khi cập nhật"
            });
        });
}