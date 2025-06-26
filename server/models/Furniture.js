const mongoose = require ("mongoose");

const furnitureSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
});

module.exports = mongoose.model("Funiture", furnitureSchema);
