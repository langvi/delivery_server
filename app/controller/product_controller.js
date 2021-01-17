const db = require("../models");
const Product = db.Product;

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Dữ liệu không được để trống"
        });
    }
    const product = new Product({
        nameProduct: req.body.nameProduct,
        sendFrom: req.body.sendFrom,
        receiveBy: req.body.receiveBy,
        addressSend: req.body.addressSend,
        addressReceive: req.body.addressReceive,
        shipedAt: null,
        shippingAt: null,
        createdAt: new Date(),
        enterAt: null,
        costShip: req.body.costShip,
        costProduct: req.body.costProduct,
        phoneSend: req.body.phoneSend,
        phoneReceive: req.body.phoneReceive,
        note: req.body.note,
        statusShip: 2,
        isSuccess: false,
        isEnter: false

    });
    product.save(product).then(data => {
        res.send({
            message: "Thêm sản phẩm thành công!",
            isSuccess: true,
            data: null
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Có lỗi xảy ra"
        });
    })
};
exports.enterProducts = async (req, res) => {
    const id = req.body.productId;
    try {
        var data = await Product.findOne().where('_id').equals(id);
        if (data.isEnter == true) {
            res.send({
                message: "Đơn hàng đã nhập",
                isSuccess: false,
                data: null
            });
        }
        else {
            if (data.isSuccess == true) {
                if (data.statusShip == 0) {
                    // lấy hàng thành công
                    var result = await Product.findByIdAndUpdate(id, {
                        isEnter: true,
                        isSuccess: false,
                        enterAt: new Date(),
                        statusShip: 1,
                        useFindAndModify: false
                    });
                    if (result) {
                        var product = await Product.findOne().where('_id').equals(id);
                        res.send({
                            message: "Nhập thành công",
                            isSuccess: true,
                            data: product
                        });
                    }
                } else if (data.statusShip == 1) {
                    // giao hàng thành công
                    res.send({
                        message: "Đơn hàng đã giao",
                        isSuccess: false,
                        data: null
                    });
                }


            } else {
                if (data.statusShip == 0) {
                    res.send({
                        message: "Đơn hàng chưa được lấy thành công",
                        isSuccess: false,
                        data: null
                    });

                }
                else {
                    var result = await Product.findByIdAndUpdate(id, {
                        isEnter: true, enterAt: new Date(),
                        isSuccess: false, useFindAndModify: false
                    });
                    if (result) {
                        var product = await Product.findOne().where('_id').equals(id);
                        res.send({
                            message: "Nhập thành công",
                            isSuccess: true,
                            data: product
                        });
                    }
                }

            }
        }

    } catch (e) {
        res.send({
            message: "Mã đơn hàng không tồn tại",
            isSuccess: false,
            data: null
        });
    }
}
exports.inforProduct = async (req, res) => {
    try {
        var countProduct = await Product.count();
        var countWait = await Product.count({ statusShip: 2 });
        var countGetting = await Product.count({ statusShip: 0 });
        var countShipping = await Product.count({ statusShip: 1, isSuccess: false });
        var countShiped = await Product.count({ statusShip: 1, isSuccess: true });
        res.send({
            message: "Thành công",
            isSuccess: true,
            data: {
                'TotalProduct': countProduct,
                'TotalGetting': countGetting + countWait,
                'TotalShipping': countShipping,
                'TotalShiped': countShiped,
            }
        });
    } catch (e) {
        res.send({
            message: "Lỗi",
            isSuccess: false,
            data: null
        });
    }
}
exports.getInforProductByTime = async (req, res) => {
    var { fromDate } = req.query;
    var { toDate } = req.query;
    var date1 = new Date(fromDate);
    var date2 = new Date(toDate);
    var products = [];
    var data = await Product.find();
    if (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].createdAt != null) {
                if (data[i].createdAt.getTime() > date1.getTime() && data[i].createdAt.getTime() < date2.getTime()) {
                    products.push(data[i]);
                }
            }

        }
        res.send({
            message: "Success",
            data: products
        });
    }
}
exports.getInforCustomer = async (req, res) => {
    const customer = db.Customer;
    var { id } = req.query;
    var data = await customer.find({ products: { $all: [id] } });
    if (data.length != 0) {
        res.send({
            message: "Thành công",
            isSuccess: true,
            data: {
                'name': data[0].name,
                'phoneNumber': data[0].phoneNumber,
                'address': data[0].address
            }
        });
    } else {
        res.send({
            message: "Lỗi",
            isSuccess: false,
            data: data
        });
    }


}
exports.findAll = (req, res) => {
    const pageSize = 10;
    var { pageIndex } = req.query;

    pageIndex = pageIndex == undefined ? 0 : pageIndex;
    Product.find().limit(pageSize).skip(parseInt(pageIndex) * pageSize)
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

exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findById(id).then(data => {
        if (!data)
            res.status(200).send({
                message: "Không tìm thấy sản phẩm với id =" + id,
                isSuccess: false,
                data: null
            });
        else res.send({
            message: "Thành công",
            isSuccess: true,
            data: data
        });
    }).catch(err => {
        res
            .status(200)
            .send({
                message: "Không tìm thấy sản phẩm",
                isSuccess: false,
                data: null
            });
    });

};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Dữ liệu không được để trống"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

};

exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Không thể xóa dữ liệu"
                });
            } else {
                res.send({
                    message: "Xóa thành công"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Có lỗi xảy ra khi xóa"
            });
        });

};

exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};