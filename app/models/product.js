module.exports = mongoose => {
    var schema = mongoose.Schema(
        {

            nameProduct: String,
            sendFrom: String,
            receiveBy: String,
            addressSend: String,
            addressReceive: String,
            shipedAt: Date,
            enterAt: Date,
            costShip: Number,
            shippingAt: Date,
            createAt: Date,
            costProduct: Number,
            statusShip: Number,
            phoneSend: String,
            phoneReceive: String,
            note: String,
            isSuccess: Boolean,
            isEnter: Boolean
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