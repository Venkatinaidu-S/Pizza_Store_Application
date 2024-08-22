const Order = require('../models/OrderModel');
const User= require('../models/UserModel')
const Message= require('../models/messagesModel')

exports.sendMessageToUser = async (req, res) => {
    try {
    const { orderId, message } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) {
    return res.status(404).json({ message: 'Order not found' });
    }
    const user = await User.findById(order.user);
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    
    const newMessage = new Message({
    order: orderId, 
    user: user._id, 
    message,
    });
    
    
    await newMessage.save();
    
    res.status(201).json({ message: 'Message sent to user successfully.', newMessage });
    } catch (error) {
    console.error('Error in sending message:', error); 
    res.status(500).json({ message: 'Server error', error: error.message });
    }
    };