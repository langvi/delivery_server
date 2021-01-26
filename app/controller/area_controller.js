const db = require("../models");
const ShipArea = db.ShipArea;
const Customer = db.Customer;
exports.getCustomerByArea = async (req, res) => {
    var result = await ShipArea.find();
    res.send({
        data:result
    });
    // var { area } = req.query;
    // var areaNum = parseInt(area);
    // if (areaNum == 0) {
    //     await getAllCustomer(res);
    // } else {
    //     await getCustomer(res, areaNum);
    // }
}
async function getAllCustomer(res) {
    try {
        var data = await Customer.find({}, { name: 1, phoneNumber: 1, avatarUrl: 1, address: 1 });
        var total = await Customer.count();
        res.send({
            message: "Thành công",
            isSuccess: true,
            data: {
                customer: data,
                totalCustomer: total
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Lỗi'
        });
    }
}
async function getCustomer(res, id) {
    try {
        var data = await ShipArea.findOne().where('areaId').equals(id);
        if (data) {
            var listCustomer = [];
            for (item in data.customers) {
                var customer = await Customer.findOne().where('_id').equals(item);
                listCustomer.push(customer);
            }
            res.send({
                message: "Thành công",
                isSuccess: true,
                data: {
                    customer: listCustomer,
                    totalCustomer: listCustomer.length
                }
            });
        } else {
            res.send({
                message: 'Lỗi'
            });
        }

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Lỗi'
        });
    }
}