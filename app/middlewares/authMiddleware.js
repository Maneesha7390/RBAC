const jwt = require('jsonwebtoken');
const userService = require('../modules/users/userService');

const authMiddleware = async (req, res, next) => {
    if(!req.header('Authorization')){
        return res.status(401).json({ success: false, error: 'Authorization key required in headers' });
    }
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, error: 'Access denied, no token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await userService.getUserById(decoded.user.id);
        if(user){
            req.user = user
            next()
        }else{
            return res.status(401).json({ success: false, error: "Token is Invalid" });
        }
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
