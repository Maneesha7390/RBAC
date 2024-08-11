const express = require('express');
const router = express.Router();
const organizationController = require('./organization.controller');
const {checkPermission} = require('../../shared/utils/rbac/rbacService')

router.post('/', checkPermission('organizations', 'create'), organizationController.createOrganization);
router.get('/', checkPermission('organizations', 'all'), organizationController.getAllOrganizations);
router.get('/:id', checkPermission('organizations', 'id'), organizationController.getOrganizationById);
router.put('/:id', checkPermission('organizations', 'id'), organizationController.updateOrganization);
router.delete('/:id', checkPermission('organizations', 'id'), organizationController.deleteOrganization);

module.exports = router;
