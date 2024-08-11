const articleRouter = require('../modules/articles/articles.route');
const organizationRouter = require('../modules/organzations/organization.route');
const userRouter = require('../modules/users/userRoutes');
const rbacRouter = require('../shared/utils/rbac/rbacRoute');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = async function(app) {
  app.use('/api/users', userRouter);
  app.use('/api/articles', authMiddleware, articleRouter);
  app.use('/api/organizations', authMiddleware, organizationRouter);
  app.use('/api/rbac', authMiddleware, rbacRouter);
};
