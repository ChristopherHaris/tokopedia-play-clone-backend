const VideoModel = require("../model/video.model");

const addVideo = async (req, res) => {
  const video = new VideoModel({ user_id: req.user.id, ...req.body });
  try {
    const savedVideo = await video.save();
    res
      .status(201)
      .json({ message: "Video added successfully", video: savedVideo });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add video", error: error.message });
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
  const id = req.params.videoId;
  try {
    const video = await VideoModel.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found!" });
    }
    if (req.user.id === video.user_id) {
      await VideoModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The video has been deleted." });
    } else {
      res.status(403).json({ message: "You can delete only your video!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting video", error: error.message });
  }
};

const search = async (req, res) => {
  const query = req.query.q;
  try {
    const videos = await VideoModel.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching videos", error: error.message });
  }
};

module.exports = {
  addVideo,
  getAllVideo,
  getVideo,
  deleteVideo,
  search,
};
