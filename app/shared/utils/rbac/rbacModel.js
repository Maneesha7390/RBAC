const mongoose = require('mongoose');
const {connectionFactory} = require('../../mongo-connection-factory');
const {COLLECTIONS, ROLES} = require('../constants')

module.exports = function model() {
    return connectionFactory().model(COLLECTIONS.RBAC, rbacSchema, COLLECTIONS.RBAC)
  };

const rbacSchema = new mongoose.Schema({
    module: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    role: {
        type: [String],
        enum: [...ROLES],
    },
    key: {
        type: String,
        required: false,
        default: ""
    }
}, { timestamps: false, versionKey: false, strict: true, autoIndex:false });
