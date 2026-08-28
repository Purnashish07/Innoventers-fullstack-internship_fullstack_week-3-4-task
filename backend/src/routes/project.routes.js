const express = require('express');
const { body, param } = require('express-validator');
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/project.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const router = express.Router();
router.use(protect);
router.route('/')
  .get(getProjects)
  .post([body('title').notEmpty().isLength({min:3}), body('description').notEmpty()], validate, createProject);
router.route('/:id')
  .put(
    [
      param('id').isMongoId().withMessage('Invalid Project ID'),
      body('status').optional().isIn(['pending', 'in-progress', 'completed'])
    ], 
    validate, 
    updateProject
  )
  .delete(
    [param('id').isMongoId().withMessage('Invalid Project ID')], 
    validate, 
    deleteProject
  );
module.exports = router;
