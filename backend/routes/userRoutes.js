const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const {
  getAllUsers,
  getUsersByRole,
  updateUserRole,
  deleteUser
} = require('../controllers/userController');

// Admin only route
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.send('Admin access granted');
});

// All routes below require authentication
router.use(authenticate);

// Admin: Get all users
router.get('/', getAllUsers);

// Admin: Get users by role
router.get('/role/:role', getUsersByRole);

// Admin: Update user role
router.put('/:id/role', updateUserRole);

// Admin: Delete user (optional)
router.delete('/:id', deleteUser);

module.exports = router;