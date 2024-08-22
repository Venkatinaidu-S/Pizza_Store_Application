const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },

    order: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', required: true },

    message: { type: String, 
        required: true },

    createdAt: { type: Date, 
        default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);