module.exports = function(schema) {
    //Preents warnings
    schema.set("useNewUrlParser", true);
    //Includes empty objects on retrieval
    schema.set("minimize", false);
    //Adds createdAt and updatedAt
    schema.set("timestamps", true);
    //Adds virtual properties to json objects returned
    schema.set("toObject", {
        virtuals: true,
    });
    //Don't want id and _id
    schema.set("id", false);
    // deperecated
    schema.set("strictQuery", false);
};