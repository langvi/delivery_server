module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            totalProduct: Number,
            totalGetting: Number,
            totalShipping: Number,
            totalShipped: Number,
            
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const user = mongoose.model("accounts", schema);
    return user;
};