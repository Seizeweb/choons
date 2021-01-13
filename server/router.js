const { pullRelease, getUserLists } = require('./controllers/controllers');
const { authMiddleware } = require('./controllers/authMiddleware');
const Router = require('@koa/router');

const router = new Router();

router.get('/release/:releaseUrl', pullRelease);
router.get('/lists', authMiddleware, getUserLists);

module.exports = router;
