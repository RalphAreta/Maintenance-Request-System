// Temporary storage for maintenance requests (replace with actual database logic)
const maintenanceRequests = [];

// Controller to create a new maintenance request
const createMaintenanceRequest = (req, res) => {
    const { title, description, priority } = req.body;

    // Validate request data
    if (!title || !description || !priority) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newRequest = {
        id: maintenanceRequests.length + 1,
        title,
        description,
        priority,
        createdAt: new Date()
    };

    // In a real-world scenario, this would save to a database
    maintenanceRequests.push(newRequest);

    // Respond with the created maintenance request
    res.status(201).json({ message: 'Maintenance request created successfully', request: newRequest });
};

// Controller to fetch all maintenance requests
const getMaintenanceRequests = (req, res) => {
    // In a real-world scenario, this would fetch from a database
    res.status(200).json({ requests: maintenanceRequests });
};

// Exporting the functions to be used in the routes
module.exports = {
    createMaintenanceRequest,
    getMaintenanceRequests
};
