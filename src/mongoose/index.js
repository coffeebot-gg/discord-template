const mongoose = require("mongoose");
const options = require("./plugins/options");
const mongoose_delete = require("mongoose-delete");

mongoose.plugin(mongoose_delete);
mongoose.plugin(options);

module.exports = mongoose;