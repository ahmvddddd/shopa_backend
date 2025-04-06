const Order = require('../../models/order');
const Cart = require('../../models/cart');

exports.placeOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, deliveryStatus } = req.body;

    const orderExists = await Order.findOne({ userId, products });

    if (orderExists) {
      orderExists.deliveryStatus = 'successfull';
      await orderExists.save();
      return res.status(200).json({
        message: 'deleiveryStatus updated'
      });
    }

    const order = await Order.create({ userId, products, totalAmount, deliveryStatus });
    await order.save();
    res.status(201).json({message: 'Your order has been placed'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.processOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const orderExists = await Order.findOne({ userId, products });

    if (orderExists) {
      orderExists.deliveryStatus = 'successfull';
      await orderExists.save();
      res.status(200).json({ message: 'success' });
    } else {
      res.status(400).json({ message: "order not processed" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}



exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.calculateOrderTotal = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.find({ userId });

    if (cartItems.length) {

      const totalAmount = cartItems.reduce((total, item) => {
        return total + item.productPrice * item.quantity;
      }, 0);

      res.status(200).json({
        message: 'Order total calculated successfully',
        totalAmount,
        items: cartItems
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error calculating order total', error: error.message });
  }
};
