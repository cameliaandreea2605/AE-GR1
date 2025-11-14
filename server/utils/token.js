const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    
    if (!bearerToken) {
        return res.status(401).json({success: false, message: 'No token provided', data: {}})
    }

    const token = bearerToken.split(' ')[1];

    if (!token) {
        return res.status(401).json({success: false, message: 'Invalid token format', data: {}})
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({success: false, message: 'Invalid token', data: {}})
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;

        next();
    })
}

const isValidToken = (token) => {
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    verifyToken,
    isValidToken,
}