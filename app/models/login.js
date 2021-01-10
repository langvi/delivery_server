module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            userName: String,
            password:String,

        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const test = mongoose.model("account", schema);
    return test;
};