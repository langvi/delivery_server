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
        address: req.body.address,
        costShip: req.body.costShip,
        costProduct: req.body.costProduct,
        status: req.body.status,
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

exports.findAll = (req, res) => {
    Product.find()
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
            } else res.send({ message: "Cập nhật thành công" });
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