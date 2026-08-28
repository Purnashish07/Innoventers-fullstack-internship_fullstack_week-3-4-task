const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

exports.createProject = asyncHandler(async (req,res) => {
  const project = await Project.create({...req.body, owner:req.user.id});
  res.status(201).json({success:true, data:project});
});
exports.getProjects = asyncHandler(async (req,res) => {
  const {status, search} = req.query;
  let filter = {owner:req.user.id};
  if(status) filter.status=status;
  if(search) filter.title = {$regex:search, $options:'i'};
  const projects = await Project.find(filter).sort({createdAt:-1});
  res.json({success:true, count:projects.length, data:projects});
});
exports.updateProject = asyncHandler(async (req,res) => {
  let p = await Project.findById(req.params.id);
  if(!p) throw new ApiError(404,'Not found');
  if(p.owner.toString() !== req.user.id) throw new ApiError(403, 'Not authorized to update this project');
  
  // Prevent updating owner
  const { title, description, status } = req.body;
  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (status) updateData.status = status;

  p = await Project.findByIdAndUpdate(req.params.id, updateData, {new:true, runValidators:true});
  res.json({success:true, data:p});
});
exports.deleteProject = asyncHandler(async (req,res) => {
  const p = await Project.findById(req.params.id);
  if(!p) throw new ApiError(404,'Not found');
  if(p.owner.toString() !== req.user.id) throw new ApiError(403, 'Not authorized to delete this project');
  await p.deleteOne();
  res.json({success:true, message:'Deleted'});
});
