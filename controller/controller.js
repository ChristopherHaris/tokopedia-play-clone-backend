const VideoModel = require('../model/video.model');
const ProductModel = require('../model/product.model');
const CommentModel = require('../model/comment.model');
const { default: mongoose } = require('mongoose');

const addVideo = async (req, res) => {
    const { thumbnailurl, videourl, title } = req.body;
    try {
        const video = new VideoModel({ thumbnailurl, videourl, title });
        const savedVideo = await video.save();
        res.status(201).json({ message: "Video added successfully", video: savedVideo });
    } catch (error) {
        res.status(500).json({ message: "Failed to add video", error: error.message });
    }
};


const addProduct = async (req, res) => {
    const { producturl, title, price, video_id } = req.body;
    try {
        const video = await VideoModel.findById(video_id);
        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }
        const product = new ProductModel({ producturl, title, price, video_id });
        const savedProduct = await product.save();
        res.status(201).json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};

const addComment = async (req, res) => {
    const { username, comment, video_id } = req.body;
    try {
        const video = await VideoModel.findById(video_id);
        if (!video) {
            return res.status(404).json({ message: "Video not found." });
        }
        const newComment = new CommentModel({ username, comment, video_id });
        const savedComment = await newComment.save();
        res.status(201).json({ message: "Comment posted successfully", comment: savedComment });
    } catch (error) {
        res.status(500).json({ message: "Failed to post comment", error: error.message });
    }
};

const getAllVideo = async (_, res) => {
    try {
        const videos = await VideoModel.find();
        if (!videos || videos.length === 0) {
            return res.status(404).json({ message: "No videos found." });
        }
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVideo = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await VideoModel.findOne({ _id: id });
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllThumbnail = async (_, res) => {
    try {
        const thumbnails = await VideoModel.find({}, { thumbnailurl: 1 });
        if (thumbnails.length === 0) {
            return res.status(404).json({ message: "No thumbnails found." });
        }
        res.status(200).json(thumbnails);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch thumbnails.", error: error.message });
    }
};

const getThumbnail = async (req, res) => {
    const id = req.params.id;
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const thumbnail = await VideoModel.findOne({ _id: objectId }, { thumbnailurl: 1 });
        if (!thumbnail) {
            return res.status(404).json({ message: "Thumbnail not found." });
        }
        res.status(200).json(thumbnail);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch thumbnail.", error: error.message });
    }
};

const getProductList = async (req, res) => {
    const id = req.params.id;
    try {
        const products = await ProductModel.find({ video_id: id }, { video_id: 0 });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found for the video." });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products.", error: error.message });
    }
};

const getComment = async (req, res) => {
    const id = req.params.id;
    try {
        const comments = await CommentModel.find({ video_id: id }, { _id: 0, __v: 0, video_id: 0, updatedAt: 0 });
        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found for the video." });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch comments.", error: error.message });
    }
};

module.exports = {addVideo, addProduct, addComment, getAllVideo, getVideo, getAllThumbnail, getThumbnail, getProductList, getComment}