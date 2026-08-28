const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const genToken = (id, role) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: '7d'});
};

exports.register = asyncHandler(async (req,res) => {
  const {name, email, password} = req.body;
  if(await User.findOne({email})) throw new ApiError(400, 'User already exists');
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({name, email, password: hash, role: 'user'});
  const token = genToken(user._id, user.role);
  res.status(201).json({success:true, token, user:{id:user._id, name:user.name, role:user.role}});
});

exports.login = asyncHandler(async (req,res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user || !(await bcrypt.compare(password, user.password))) throw new ApiError(401, 'Invalid credentials');
  const token = genToken(user._id, user.role);
  res.json({success:true, token, user:{id:user._id, name:user.name, role:user.role}});
});

exports.getMe = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user.id).select('-password');
  if(!user) throw new ApiError(404, 'User not found');
  res.json({success:true, user});
});

