const express = require('express');
const router = express.Router();
const articleController = require('./articles.controller');
const {checkPermission} = require('../../shared/utils/rbac/rbacService')

router.post('/', checkPermission('articles', 'create'), articleController.createArticle);
router.get('/', checkPermission('articles', 'all'), articleController.getAllArticles);
router.get('/:id', checkPermission('articles', 'id'), articleController.getArticleById);
router.put('/:id', checkPermission('articles', 'id'), articleController.updateArticle);
router.delete('/:id', checkPermission('articles', 'id'), articleController.deleteArticle);
router.post('/:id/test', checkPermission('articles', 'test'), articleController.updateArticle);

module.exports = router;
