import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Voter from "../models/VoterModel.js";
import generateToken from "../utils/generateToken.js";

//@desv     Auth user/set token
//route     POST /api/users/auth
//@access   public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      rights: user.rights,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid email or password`);
  }
});

//@desv     register a new user
//route     POST /api/users
//@access   public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'created user successfully!'
    });
  } else {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
});

//@desv     Get user profile
//route     POST /api/users/logout
//@access   public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

//@desv     Update user profile
//route     PUT /api/users/profile
//@access   private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      rights: updatedUser.rights,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desv     Get voter data
//route     GET /api/users/voter
//@access   private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    rights: req.user.rights,
  };
  res.status(200).json(user);
});

//@desv     Get user profile
//route     GET /api/users/profile
//@access   private
const searchVoter = asyncHandler(async (req, res) => {
  const voterId = req.body.voterNumber;

  const voter = await Voter.findOne({ voterId });
  if (voter) {
    res.status(201).json({
      name: voter.name,
      voterId: voterId,
      voted: voter.voted,
      updatedAt: voter.updatedAt,
      box: voter.box,
      votedBy: voter.votedBy,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid Voter Id`);
  }
});

const changeVote = asyncHandler(async (req, res) => {

  let voterId = req.body.voterNumber;
  let userInfo = req.body.userInfo;
  const voter = await Voter.findOne({ voterId });

  if (voter) {
    voter.voted = !voter.voted;
    if (voter.votedBy.length !== 0) {
      voter.votedBy[0].set({
        id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
      });
    } else {
      voter.votedBy.push({
        id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
      });
    }

    const updatedVoter = await voter.save();
    res.status(200).json({
      _id: updatedVoter._id,
      name: updatedVoter.name,
      voted: updatedVoter.voted,
      voterId: voterId,
      updatedAt: updatedVoter.updatedAt,
      box: updatedVoter.box,
      votedBy: updatedVoter.votedBy,
    });
  } else {
    res.status(400);
    throw new Error(`Already Voted`);
  }

  // res.status(200).json({message: 'change vote'})
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  searchVoter,
  changeVote,
};
