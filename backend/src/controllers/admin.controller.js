const User = require('../models/User');
const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

exports.getAdminStats = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();
  const projectCount = await Project.countDocuments();
  const pendingCount = await Project.countDocuments({ status: 'pending' });
  const inProgressCount = await Project.countDocuments({ status: 'in-progress' });
  const completedCount = await Project.countDocuments({ status: 'completed' });

  // Get a brief overview of the latest users and projects for the admin table
  const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('-password');
  const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5).populate('owner', 'name email');

  res.json({
    success: true,
    data: {
      stats: {
        users: userCount,
        projects: projectCount,
        pending: pendingCount,
        inProgress: inProgressCount,
        completed: completedCount
      },
      recentUsers,
      recentProjects
    }
  });
});
