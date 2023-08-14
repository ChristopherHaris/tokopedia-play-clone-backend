const VideoModel = require("../model/video.model");
const CommentModel = require("../model/comment.model");

const addComment = async (req, res) => {
  const newComment = new CommentModel({ ...req.body, user_id: req.user.id });
  try {
    const savedComment = await newComment.save();
    res
      .status(201)
      .json({ message: "Comment posted successfully", comment: savedComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to post comment", error: error.message });
  }
};

const getComment = async (req, res) => {
  const id = req.params.videoId;
  try {
    const comments = await CommentModel.find({ video_id: id }, { __v: 0 });
    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for the video." });
    }
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments.", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    const video = await VideoModel.findById(comment.video_id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    if (req.user.id === comment.user_id || req.user.id === video.user_id) {
      await CommentModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The comment has been deleted." });
    } else {
      res.status(403).json({ message: "You can delete only your comment!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

module.exports = { addComment, getComment, deleteComment };
