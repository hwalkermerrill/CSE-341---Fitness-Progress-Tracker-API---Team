const requireAdmin = (req, res, next) => {
    const role = req.headers['x-user-role'];

    if (!role) {
        return res.status(401).json({
            message: 'A user role is required.'
        });
    }

    if (role.toLowerCase() !== 'admin') {
        return res.status(403).json({
            message: 'Admin access is required.'
        });
    }

    next();
};

module.exports = {
    requireAdmin
};