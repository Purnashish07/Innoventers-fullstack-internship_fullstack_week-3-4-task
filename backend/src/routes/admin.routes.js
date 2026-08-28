const express = require('express');
const { getAdminStats } = require('../controllers/admin.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

// All admin routes must be protected and restricted to 'admin' role
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);

module.exports = router;
