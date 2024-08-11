const Joi = require('joi');
const CONSTANTS = require('../constants')

const permissionValidation = Joi.object({
    module: Joi.string().valid(...CONSTANTS.MODULES).required(),
    method: Joi.string().required(),
    key: Joi.string().optional(),
    role: Joi.array().items(Joi.string().valid(...CONSTANTS.ROLES, 'all')).required()
});

module.exports = {
    permissionValidation
};
