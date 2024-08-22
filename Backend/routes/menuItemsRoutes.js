const express = require('express');

const {createMenuItem,
    getAllMenuItems,
    updateMenuItem,
    deleteMenuItem
} =  require('../Controllers/menuItemsController');

const {protect,admin } =require('../middleware/authMiddleware');

const router= express.Router();

//routes
router.post('/additem',protect,admin,createMenuItem);  // only admin
router.get('/',protect,getAllMenuItems);               // any loggedin user
router.put('/update/:id',protect,admin,updateMenuItem);    // only admin
router.delete('/delete/:id',protect,admin,deleteMenuItem);    // only admin

module.exports=router;