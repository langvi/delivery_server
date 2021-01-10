module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
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
    const customer = mongoose.model("customers", schema);
    return customer;
};