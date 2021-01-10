const db = require("../models");
const Login = db.login;
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Dữ liệu không được để trống"
        });
    }
    const login = new Login({
        userName: req.body.userName,
        password: req.body.password
    });
    login.save(login).then(data => {
        res.send({
            message: "Thêm tài khoản thành công!",
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
    Login.find()
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
                    err.message || "Lỗi "
            });
        });

};