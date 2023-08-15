const UserModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new UserModel({ ...req.body, password: hash });

    await newUser.save();
    res.status(201).json({ message: "User has been created!", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await UserModel.findOne({ name: req.body.name });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) {
      return res.status(400).json({ message: "Wrong Credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none", // Set SameSite attribute
        secure: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
};

const googleAuth = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none", // Set SameSite attribute
          secure: true,
        })
        .status(200)
        .json({ ...user._doc, token });
    } else {
      const newUser = new UserModel({
        ...req.body,
        fromGoogle: true,
      });

      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none", // Set SameSite attribute
          secure: true,
        })
        .status(201)
        .json({ ...savedUser._doc, token });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error during Google authentication",
      error: error.message,
    });
  }
};

module.exports = { signIn, signUp, googleAuth };
