const router = require('express').Router();

const {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
  } = require('../../controllers/user-controller');

//GET all and POST at /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

//GET one, PUT, and DELETE at /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;