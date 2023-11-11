const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true,versionKey:false});

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = ImageModel;
