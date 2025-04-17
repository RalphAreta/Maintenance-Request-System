const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const maintenanceController = require('../controllers/maintenanceController');

// Create maintenance request (Authenticated users)
router.post('/create', authenticate, maintenanceController.createRequest);

// Get all requests (Admin only, can customize auth logic later)
router.get('/', authenticate, maintenanceController.getAllRequests);

// Get request by ID
router.get('/:id', authenticate, maintenanceController.getRequestById);

// Get requests by user ID
router.get('/user/:userId', authenticate, maintenanceController.getRequestsByUser);

// Update request (status and assignment)
router.put('/:id', authenticate, maintenanceController.updateRequestStatus);

// Delete request (optional, maybe for admin only)
router.delete('/:id', authenticate, maintenanceController.deleteRequest);

module.exports = router;