//require express Router
const router = require('express').Router();

//requires for User/Friend methods
const {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

//export router 
module.exports = router;