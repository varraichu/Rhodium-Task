const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    model:{
        type: String,
        required: true,
        minlength: 3,
    },
    postedBy:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    phone_number:{
        type: String,
        required: true,
        maxlength: 11,
    },
    max_pictures:{
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    pictures:{
        type: [String],
        required: true,
    },
});

const Cars = mongoose.model('Cars', carSchema);
module.exports = Cars;
