module.exports = mongoose => {
    var schema = mongoose.Schema(
        {   
            areaId: Number,
            name: String,
            customers: Array,
            shippers: Array

        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const area = mongoose.model("shipAreas", schema);
    return area;
};