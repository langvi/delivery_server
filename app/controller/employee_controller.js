const db = require("../models");
const Employee = db.Employee;
const Product = db.Product;
exports.findAll = async (req, res) => {

    const pageSize = 10;
    var { pageIndex } = req.query;
    pageIndex = pageIndex == undefined ? 0 : pageIndex;
    var countEmployee = await Employee.count();
    Employee.find({}, { name: 1, phoneNumber: 1, avatarUrl: 1, shipArea: 1, dayWork: 1 }).limit(pageSize).skip(parseInt(pageIndex) * pageSize)
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
exports.getCountProductByShipper = async (req, res) => {
    try {
        var { fromDate } = req.query;
        var { toDate } = req.query;
        var { _id } = req.query;
        var ids = await Employee.findOne({}, { products: 1 });
        ids.products.forEach(element => {

        });
        // var countSuccess = await Product.count(
        //     {
        //         'createAtTime': {
        //             '$gt': fromDate,
        //             '$lt': toDate
        //         },
        //         status: [2, 6]
        //     });
        // var countFailure = await Product.count({
        //     'createAtTime': {
        //         '$gt': fromDate,
        //         '$lt': toDate
        //     },
        //     status: [3, 5]
        // });
        res.send({
            message: "Thành công",
            isSuccess: true,
            data: ids
            // data: {
            //     success: countSuccess,
            //     failure: countFailure
            // }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Lỗi'
        });
    }
}
exports.findProductsByTime = async (req, res) => {
    var { fromDate } = req.query;
    var { toDate } = req.query;
    var { _id } = req.query;
    var listProduct = [];
    try {
        var ids = await Employee.findOne({}, { products: 1 }).where('_id').equals(_id);
        for (var index = 0; index < ids.products.length; index++) {
            var productSuccess = await Product.findOne(
                {
                    productId: parseInt(ids.products[index]),
                }
            );
            listProduct.push(productSuccess);
        }
        var result = [];
        listProduct.forEach(element => {
            if (element.createAtTime > fromDate && element.createAtTime < toDate) {
                result.push(element);
            }
        });
        res.send({
            message: "Thành công",
            isSuccess: true,
            data: result
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Lỗi'
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
exports.findEmployee = async (req, res) => {
    try {
        var { keySearch } = req.query;
        var names = await Employee.find({}, { name: 1, phoneNumber: 1, avatarUrl: 1, shipArea: 1 });
        var result = [];
        names.forEach(element => {
            if (element.name.toLowerCase().includes(keySearch.toLowerCase())) {
                result.push(element);
            }
        });

        res.send({
            message: "Thành công",
            isSuccess: true,
            data: {
                employees: result,
                totalShipper: result.length
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Lỗi'
        });
    }
}