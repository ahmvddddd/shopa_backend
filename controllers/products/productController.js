const Product = require('../../models/product');

exports.uploadProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription, productCategory, productSku, tags } = req.body;
    const productImages = req.files.map((file) => file.buffer);
    
    const product = new Product({ productName, productPrice, productDescription, productCategory, productImages, productSku, tags: tags ? tags.split(',') : [],});
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.files) updates.productImages = req.files.map((file) => file.buffer);
    
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
      const { productId } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
  }
};


exports.getProducts = async (req, res) => {
  try {
      const products = await Product.find(); 
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
  }
};


exports.getProductsByTag = async (req, res) => {
  try {
      const { tag } = req.params; 
      const products = await Product.find({ tags: { $in: [tag] } });

      const formattedProducts = products.map(product => ({
          ...product._doc,
          productImages: product.productImages.map(image => image.toString('base64')) // Convert Buffer to Base64
      }));

      res.status(200).json(formattedProducts);
  } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
  }
};