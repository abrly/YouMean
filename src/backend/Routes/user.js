const express=require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router=express.Router();

const UserModel = require('../models/userdatamodel');


router.get('',(req,res,next)=>{

    res.status(200).json({
        Message:'ok'
    });

});

router.post('/login',(req,res,next)=>{

    userInfo:UserModel;

    UserModel.findOne({email:req.body.email})
    .then((user)=>{

        if (!user){

           

            return res.status('401').json({
                message:"auth failed"
            });
        }

        userInfo=user;

        return bcrypt.compare(req.body.password,user.password);
         
    })
    .then((result)=>{

       

        if (!result){
            
            return res.status('401').json({
                message:"Invalid login credentials!"
            });

        }

        const token= jwt.sign({email:userInfo.email,userid:userInfo._id},
                              "secret_is_here",{expiresIn:'1hr'}
                    );

        res.status('200').json({

            WebToken : token,
            ExpiresIn : 3600,
            UserID : userInfo._id
        })



    })
    .catch((err)=>{

        return res.status('401').json({
            message:"auth failed"
        });

    });

});

router.post('/signup',(req,res,next)=>{



    bcrypt.hash(req.body.password,10)
           .then((hasdPwd)=>{

           

                const userData =new UserModel(
                {
                    email: req.body.email, 
                    password:hasdPwd
                 
                  });

                  userData.save().then((result)=>{
                  

                    res.status(201).json({
                
                            message:'Data Posted success',
                            createdPost: { 
                              
                                'email':result.email
                            }              
            
                         });
                           
                    },(rjtCase)=>{

                        console.log('i get rje case');

                        return res.status('401').json({
                            message:'Invalid registration credentials!'
                        });

                    });


           })
           .catch((err)=>{

            console.log('i get sss');

            return res.status('401').json({
                message:'registration failed!'
            });

              //  Error:err;

           })


    

    
         
   

});

module.exports=router;