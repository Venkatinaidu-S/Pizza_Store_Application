const Order = require('../models/OrderModel');

//place a new order (user)
exports.placeOrder = async (req, res) => {
    const { items, totalPrice } = req.body;

    try {
        const order = new Order({
            items,
            totalPrice,
            user: req.user.id
        });

        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//cancel an order
exports.cancelOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order)
            return res.status(404).json({ message: 'Order not found' });

        if (order.status !== 'Pending') {
            return res.status(400).json({ message: 'Order cannot be canceled at this stage' });
        }

        order.status = 'Canceled';
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status.json({ message: error.message });
    }
}

// Get user's orders
exports.getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id });
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }  
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


//viewbill of an order for user along with payment options.
exports.viewBillByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by ID and ensure it's accepted
    const order = await Order.findOne({ _id: orderId, status: 'accepted' });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or not accepted.' });
    }

    // Define available payment options
    const paymentOptions = [
      'Credit Card',
      'Debit Card',
      'Net Banking',
      'UPI',
      'Cash on Delivery',
    ];

    // Respond with the bill amount and payment options
    return res.status(200).json({
      totalAmount: order.totalPrice,
      paymentOptions,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving bill', error });
  }
};

//generate bill for user- for all accepted orders (admin)
exports.generateBill = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find all accepted orders for the user
      const orders = await Order.find({ user: userId, status: 'accepted' });
  
      if (!orders.length) {
        return res.status(404).json({ message: 'No accepted orders found for this user.' });
      }
  
      // Calculate the total amount
      const totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  
      // Respond with the generated bill
      return res.status(200).json({ message: 'Bill generated successfully', totalAmount });
    } catch (error) {
      return res.status(500).json({ message: 'Error generating bill', error });
    }
  };

