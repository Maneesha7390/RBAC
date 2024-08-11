const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {connectionFactory} = require('../../shared/mongo-connection-factory');
const moment = require('moment')
const {COLLECTIONS, ROLES} = require('../../shared/utils/constants')


module.exports = function model() {
    return connectionFactory().model(COLLECTIONS.USERS, userSchema, COLLECTIONS.USERS)
  };

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [...ROLES],
        default: 'endUser'
    }
}, { timestamps: false, versionKey: false, strict: true, autoIndex:false });

userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

