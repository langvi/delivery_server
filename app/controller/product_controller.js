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
        createAtTime: new Date().getTime(),
        enterAt: null,
        costShip: req.body.costShip,
        costProduct: req.body.costProduct,
        phoneSend: req.body.phoneSend,
        phoneReceive: req.body.phoneReceive,
        note: req.body.note,
        status: 0,

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
        if (data.status == 7) {
            res.send({
                message: "Đơn hàng đã nhập",
                isSuccess: false,
                data: null
            });
        }
        else if (data.status == 2 || data.status == 5) {
            var result = await Product.findByIdAndUpdate(id, {
                enterAt: new Date().getTime(),
                status: 7,
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
        }
        else if (data.status == 1 || data.status == 3 || data.status == 0) {
            res.send({
                message: "Đơn hàng chưa lấy thành công",
                isSuccess: false,
                data: null
            });
        }
        else if (data.status == 4) {
            res.send({
                message: "Đơn hàng đang giao",
                isSuccess: false,
                data: null
            });
        }
        else {
            res.send({
                message: "Đơn hàng đã giao",
                isSuccess: false,
                data: null
            });
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
        var countGetting = await Product.count({ status: [0, 1, 2, 3] });
        var countShipping = await Product.count({ status: [4, 5, 7] });
        var countShiped = await Product.count({ status: 6 });
        res.send({
            message: "Thành công",
            isSuccess: true,
            data: {
                'TotalProduct': countProduct,
                'TotalGetting': countGetting,
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
    if (fromDate == '' || toDate == '') {
        var countGetting = await Product.count({ status: [0, 1, 2, 3] });
        var countShipping = await Product.count({ status: [4, 5, 7] });
        var countShiped = await Product.count({ status: 6 });
        res.send({
            message: 'Thành công',
            isSuccess: true,
            data: {
                countGetting: countGetting,
                countShipping: countShipping,
                countShiped: countShiped
            }
        })
    }else{
        var getting = await Product.count({
            'createAtTime': {
                '$gt': fromDate,
                '$lt': toDate
            },
           status: [0, 1, 2, 3]
    
        });
        var shipping = await Product.count({
            'createAtTime': {
                '$gt': fromDate,
                '$lt': toDate
            },
           status: [4, 5, 7]
    
        });
        var shiped = await Product.count({
            'createAtTime': {
                '$gt': fromDate,
                '$lt': toDate
            },
           status: 6
    
        });
        res.send({
            message: 'Thành công',
            isSuccess: true,
            data: {
                countGetting: getting,
                countShipping: shipping,
                countShiped: shiped
            }
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