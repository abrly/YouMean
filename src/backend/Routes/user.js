const express=require('express');

const router=express.Router();

const userController=require('../controllers/user');



router.get('',(req,res,next)=>{

    res.status(200).json({
        Message:'ok'
    });

});

router.post('/login',userController.loginUser);

router.post('/signup',userController.createUser);

module.exports=router;