module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nameProduct: String,
            sendFrom: String,
            receiveBy: String,
            address: String,
            costShip: Number,
            costProduct: Number,
            status: Number,
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const product = mongoose.model("products", schema);
    return product;
};