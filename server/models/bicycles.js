const mongoose = require('mongoose');
const { Schema } = mongoose;

const BicycleSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String, 
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        maxlength: 200
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    location: {
        type: String,
        required: true,
        default: 'blabla'
    },
    image: {
        type: String,
        required: true 
    }
}, { timestamps: true})

module.exports = mongoose.model('Bicycle', BicycleSchema);