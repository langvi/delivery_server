module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            accountName: String,
            password: String,
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