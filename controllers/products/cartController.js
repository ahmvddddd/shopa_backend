const Cart = require('../../models/cart');
const Product = require('../../models/product');


exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, productName, productPrice, quantity } = req.body;

    if (!userId || !productId || !productName || !productPrice || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const cartExists = await Cart.findOne({ userId, productId });

    if (cartExists) {
      cartExists.quantity += 1;
      await cartExists.save();
      return res.status(200).json({
        message: "Quantity updated",
        userId: cartExists.userId,
        productId: cartExists.productId,
        productName: cartExists.productName,
        productPrice: cartExists.productPrice,
        quantity: cartExists.quantity
      });
    } 

    const newCart = await Cart.create({ userId, productId, productName, productPrice, quantity });

    res.status(200).json({
      message: "Product added to cart",
      userId: newCart.userId,
      productId: newCart.productId,
      productName: newCart.productName,
      productPrice: newCart.productPrice,
      quantity: newCart.quantity
    });

  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};





exports.removeFromCart = async (req, res) => {
  try {
    const {  productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.find({ userId, productId });
    
    if (cart) {
      await Cart.deleteOne();
    }

    res.status(200).json({message: 'Cart product removed'});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.deleteMany({ userId });

    if (!cart) {
      res.status(400).json({message: 'Cart product not removed'});
    }

    res.status(200).json({message: 'Cart product removed'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


exports.getCartProducts = async (req, res) => {
    try {
        const { userId } = req.user._id;

        const cart = await Cart.find(userId);

        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({  error: err.message });
    }
};
