const userService = require('./userService');
const { registerValidation, loginValidation } = require('./userValidator');

const register = async (req, res) => {
    try {
        let reqBody = req.body
        let framedData = {
            username: reqBody.username || '',
            email: reqBody.email || '',
            password: reqBody.password || '',
            role: reqBody.role.toLowerCase() || '',
        }
        const { error } = registerValidation.validate(framedData);
        if (error) return res.status(400).json({ success: false, error: error.details[0].message });
        const user = await userService.registerUser(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { error } = loginValidation.validate(req.body);
        if (error) return res.status(400).json({ success: false, error: error.details[0].message });
        const { email, password } = req.body;
        const { token } = await userService.loginUser(email, password);
        res.status(200).json({ success: true, data: { token } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user._id);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const userExists = async (req, res, next) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if(user){
            throw Error('User Already Exists')
        }else{
            next()
        }
    } catch (error) {
        res.status(400).json({ success: false, error: 'User Already Exists' });
    }
};
module.exports = {
    register,
    login,
    getProfile,
    userExists
};
