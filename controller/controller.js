const VideoModel = require('../model/video.model');
const ProductModel = require('../model/product.model');
const CommentModel = require('../model/comment.model');

const addVideo = async (req, res) => {
    const {thumbnailurl, videourl, title} = req.body;
    const video = new VideoModel({
        thumbnailurl, videourl, title
    });
    try {
        const result = await video.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
};

const addProduct = async (req, res) => {
    const {producturl, title, price, videoid} = req.body;
    const product = new ProductModel({
        producturl, title, price, videoid
    });
    try {
        const result = await product.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
};

const addComment = async (req, res) => {
    const {username, comment, videoid} = req.body;
    const comments = new CommentModel({
        username, comment, videoid
    });
    try {
        result = await comments.save();
        res.status(201).json({message: "Comment posted successfully"});
    } catch (error) {
        res.status(400).json(error, {message: "Failed to post comment"});
    }
};

const getVideo = async (_, res) => {
    try {
        const video = await VideoModel.find();
        res.status(200).json(video)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

const getThumbnail = async (_, res) => {
    try {
        const thumbnail = await VideoModel.aggregate([{$project: {thumbnailurl: 1}}]);
        res.status(200).json(thumbnail)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

const getProductList = async (req, res) => {
    const id = req.params.id;
    try {
        const products = await ProductModel.find({videoid: id});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getComment = async (req, res) => {
    const id = req.params.id;
    try {
        const comments = await CommentModel.find({videoid: id});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {addVideo, addProduct, addComment,getVideo ,getThumbnail, getProductList, getComment}