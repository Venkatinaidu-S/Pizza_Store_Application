
const express = require('express');
const { 
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,updateUserProfile
     } = require('../Controllers/userController');

const { protect,admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);  //any user
router.post('/login', loginUser);        //only registered user
router.get('/profile', protect, getUserProfile); // only logged in user
router.post('/logout', protect, logoutUser);   //user can log out after login
router.put('/updateprofile',protect,updateUserProfile);//logged in user can update their profile
module.exports = router;