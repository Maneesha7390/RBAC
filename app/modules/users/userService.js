const User = require('./userModel');
const jwt = require('../../shared/utils/jwt');

const registerUser = async (userData) => {
    const user = new User()(userData);
    await user.save();
    return user;
};

const loginUser = async (email, password) => {
    const user = await User().findOne({email})
    console.log('user', user)
    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.generateToken(user);
    return { token };
};

const getUserById = async (id) => {
    const user = await User().findOne({_id: id}, {email:1, _id:1, role:1}).lean();
    return user
};

const getUserByEmail = async (email) => {
    return await User().findOne({email}).lean();
};
module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getUserByEmail
};
