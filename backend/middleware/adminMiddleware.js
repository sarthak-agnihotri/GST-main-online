const admin = (req, res, next) => {
    if (typeof next !== 'function') {
        return res.status(500).json({ message: 'Internal middleware error' });
    }

    if (req.user && req.user.role === 'admin') {
        return next(); // ✅ ensure we stop execution here
    }

    return res.status(403).json({ message: 'Not authorized as an admin' });
};

module.exports = admin;
