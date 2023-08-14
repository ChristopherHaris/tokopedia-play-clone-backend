const UserModel = require('../model/user.model');

const updateUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update user", error: error.message });
    }
  } else {
    res.status(403).json({ message: "You can update only your account!" });
  }
};

const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
        } catch (error) {
            res.status(500).json({ message: "Failed to delete user", error: error.message });
        }
    } else {
        res.status(403).json({ message: "You can delete only your account!" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        console.log(user)
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve user", error: error.message });
    }
};

module.exports = { updateUser, getUser, deleteUser };
