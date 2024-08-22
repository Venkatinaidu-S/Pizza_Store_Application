const express= require('express');

const {
    placeOrder,
    cancelOrder,
    getUserOrders,
    viewBillByOrderId,
    generateBill
}= require('../Controllers/ordersContoller');

const {protect, admin}= require('../middleware/authMiddleware');

const router= express.Router();

//routes
router.post('/',protect,placeOrder);                           //loggedin user can place order
router.delete('/cancel/:id',protect,cancelOrder);              //user can cancel order by orderid 
router.get('/userorders',protect,getUserOrders);               //logged in user can their orders.
router.get('/viewbill/:orderId',protect,viewBillByOrderId);    //it will shoe bill for a particular order

router.get('/bill/:userId',protect,admin,generateBill);         //login admin can generate bill for particular user

module.exports=router;