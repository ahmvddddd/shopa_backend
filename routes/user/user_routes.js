const express = require('express');
const { getUserInfo, getUserByUsername, getAllUsers } = require('../../controllers/user/user_controller');
const { protect } = require('../../middlewares/auth_middleware');

const router = express.Router();

router.route('/user').get(protect, getUserInfo);
router.get('/users/:username', protect, getUserByUsername);
router.get('/users', protect, getAllUsers);


module.exports = router;
