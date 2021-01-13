const db = require("../models");
const Employee = db.Employee;
exports.findAll = async (req, res) => {

    const pageSize = 10;
    var { pageIndex } = req.query;
    pageIndex = pageIndex == undefined ? 0 : pageIndex;
    var countEmployee = await Employee.count();
    Employee.find({}, { name: 1, phoneNumber: 1, avatarUrl: 1 }).limit(pageSize).skip(parseInt(pageIndex) * pageSize)
        .then(data => {
            res.send({
                message: "Thành công",
                isSuccess: true,
                data: {
                    employees: data,
                    totalShipper: countEmployee
                }
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
    var data = await Employee.findOne({ _id });
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
exports.updateEmployee = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Dữ liệu không được để trống"
        });
    }

    const id = req.params.id;

    Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
// function getProductByTime(type){
//     const _id = req.query;
//     var data = await Employee.findOne({ _id });
//     var productEm = [];
//     if (data) {
//         var productIds = data.products;
//         const Product = db.Product;
//         for (var index = 0; index < productIds.length; index++) {
//             // var product = await Product.findById(productIds[index]);
//             var product = await Product.find({shippingAt: {$lt:}})

//             productEm.push(product);
//         }
//     }
//     if(type == 0){

//     }
// } 