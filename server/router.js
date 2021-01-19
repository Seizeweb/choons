const {
  pullRelease,
  getUserLists,
  getListReleases,
  deleteReleaseFromList,
  addReleaseToList,
  deleteList,
  createList,
} = require('./controllers/collections');
const { createUser, deleteUser, login, profile, logout } = require('./controllers/auth');
const { authMiddleware } = require('./middlewares/authMiddleware');
const Router = require('@koa/router');

const router = new Router();

router.get('/release/:releaseUrl', authMiddleware, pullRelease);
router.get('/lists', authMiddleware, getUserLists);
router.get('/list/:id', authMiddleware, getListReleases);
router.put('/list/:listId/:releaseId', authMiddleware, deleteReleaseFromList);
router.post('/list/:listId/:releaseId', authMiddleware, addReleaseToList);
router.post('/new-list', authMiddleware, createList);
router.delete('/list/:id', authMiddleware, deleteList);

router.post('/login', login);
router.post('/register', createUser);
router.get('/profile', authMiddleware, profile);
router.post('/logout', authMiddleware, logout);
router.delete('/deleteaccount', authMiddleware, deleteUser);

module.exports = router;
