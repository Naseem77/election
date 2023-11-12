import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Voter from "../models/VoterModel.js";
import generateToken from "../utils/generateToken.js";
import { Location } from "../utils/localdata.js";
const Locations = ["abn roshd", "abn sena", "alhekme", "omar bn alkatab", "abn kaldon", "abn sena B"]; //could insert more locations

//@desv     voteCount admin/voteCount
//route     GET /api/admin/votecount
//@access   private
const voteCount = asyncHandler(async (req, res) => {
  const vote = await Voter.count({
    voted: true,
  });

  const notVote = await Voter.count({
    voted: false,
  });
  res.status(200).json({ vote: vote, notVote: notVote });
});

//@desv     voterbox admin/voterbybox
//route     GET /api/admin/voterbybox
//@access   private
const voteCountByBox = asyncHandler(async (req, res) => {
  const { boxNumber } = req.body;
  const voted = await Voter.count({
    box: boxNumber,
    voted: true,
  });
  const notVoted = await Voter.count({
    box: boxNumber,
    voted: false,
  });

  res.status(200).json({ voted: voted, notvoted: notVoted });
});

//@desv     voterLocation admin/voterbylocation
//route     GET /api/admin/voterbylocation
//@access   private
const voteCountByLocation = asyncHandler(async (req, res) => {
  const { location } = req.body;
  let votersCount = 0;
  let notVotersCount = 0;
  let value = Location[location - 1];
  let data = [];
  
  for (let item of value) {
    let boxCountVoters = await Voter.count({
      box: item,
      voted: true,
    });

    let boxCountNotVoters = await Voter.count({
      box: item,
      voted: false,
    });

    data.push({
      name: "box" + item,
      voted: boxCountVoters,
      notVoted: boxCountNotVoters,
    });

    votersCount += boxCountVoters;
    notVotersCount += boxCountNotVoters;
  }

  res.status(200).json({ voted: votersCount, notvoted: notVotersCount, data });
});

const getAllLocations = asyncHandler(async (req, res) => {
  let votersCount = 0;
  let notVotersCount = 0;
  let data = [];

  for (let i = 0; i < Locations.length; i++) {

    votersCount += await Voter.count({
      boxLocation: Locations[i],
      voted: true,
    });
    notVotersCount += await Voter.count({
      boxLocation: Locations[i],
      voted: false,
    });
    data.push({
      name: Locations[i],
      voted: votersCount,
      notVoted: notVotersCount,
    });
    votersCount = 0;
    notVotersCount = 0;
  }
  res.status(200).json({ data });
});

//@desv     voterID admin/voterByID
//route     GET /api/admin/voterbyid
//@access   private
const voterByID = asyncHandler(async (req, res) => {
  const { voterId } = req.body;
  const voter = await Voter.find({
    voterId: voterId,
  });

  res.status(200).json({ voter: voter });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select("-password")
    .select("-createdAt")
    .select("updatedAt");
  //   console.log(users);

  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  let id = req.body.id;
  const user = await User.findByIdAndDelete({ _id: id });

  res.status(201).json({ message: "user has been deleted!", action: true });
});

export {
  voteCount,
  voteCountByBox,
  voteCountByLocation,
  voterByID,
  getAllUsers,
  deleteUser,
  getAllLocations,
};
