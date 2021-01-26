const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            // name: { type: String, index: true },
            name: String,
            phoneNumber: String,
            avatarUrl: String,
            address: String,
            products: Array,
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    schema.plugin(mongoose_fuzzy_searching, { fields: ['name'] });
    // schema.index({name: 'text'});
    const customer = mongoose.model("customers", schema);
    // customer.createIndexes();
    return customer;
};