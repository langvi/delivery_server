module.exports = mongoose => {
    var schema = mongoose.Schema(
        {

            nameProduct: String,
            sendFrom: String,
            receiveBy: String,
            addressSend: String,
            addressReceive: String,
            shipedAt: Number,
            enterAt: Number,
            costShip: Number,
            shippingAt: Number,
            createAtTime: Number,
            costProduct: Number,
            status: Number,
            phoneSend: String,
            phoneReceive: String,
            note: String,
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