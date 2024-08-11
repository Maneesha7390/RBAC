const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    let framedUser ={
        name: user.username || '',
        email: user.email || '',
        role: user.role || '', 
        id: user._id.toString()
    }
    return jwt.sign({ user: framedUser }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

module.exports = {
    generateToken
};
