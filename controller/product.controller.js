const VideoModel = require("../model/video.model");
const ProductModel = require("../model/product.model");

const addProduct = async (req, res) => {
  const newProduct = new ProductModel({ ...req.body });
  try {
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};

const getProductList = async (req, res) => {
  const id = req.params.videoId;
  try {
    const products = await ProductModel.find({ video_id: id });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the video." });
    }
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products.", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    const video = await VideoModel.findById(comment.video_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    if (req.user.id === product.user_id || req.user.id === video.user_id) {
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The product has been deleted." });
    } else {
      res.status(403).json({ message: "You can delete only your product!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = { addProduct, getProductList, deleteProduct };
