module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            accountName: String,
            phoneNumber: String,
            dayWork: Number,
            shipArea:String,
            avatarUrl:String,
            products: Array,
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const employee = mongoose.model("employees", schema);
    return employee;
};