const Products = require('../../models/product');

const getProductsGroupedByCategory = async (req, res) => {
    try {
        const products = await Products.aggregate([
            {
                $group: {
                    _id: "$productCategory",
                    products: {
                        $push: {
                            _id: "$_id",
                            productImages: "$productImages",
                            productName: "$productName",
                            productPrice: "$productPrice",
                            productCategory: "$productCategory",
                            productDescription: "$productDescription",
                            productSku: "$productSku",
                            tags: "$tags"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    productCategory: "$_id",
                    products: 1
                }
            }
        ]);

        // Convert Buffer images to base64
        products.forEach(category => {
            category.products.forEach(product => {
                product.productImages = product.productImages.map(image => 
                    image.toString('base64')
                );
            });
        });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProductsGroupedByCategory
};
