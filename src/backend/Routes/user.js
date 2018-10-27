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

            console.log('user not found');

            return res.status('401').json({
                message:"auth failed"
            });
        }

        userInfo=user;

        return bcrypt.compare(req.body.password,user.password);
         
    })
    .then((result)=>{

        console.log('compare done');

        if (!result){
            
            return res.status('401').json({
                message:"auth failed"
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

        console.log(err);

        return res.status('401').json({
            message:"auth failed"
        });

    });

});

router.post('/signup',(req,res,next)=>{

    console.log('i come here');

    bcrypt.hash(req.body.password,10)
           .then((hasdPwd)=>{

            console.log('i come here 2');

                const userData =new UserModel(
                {
                    email: req.body.email, 
                    password:hasdPwd
                 
                  });

                  userData.save().then((result)=>{

                    console.log('i come here 3');

                    res.status(201).json({
                
                            message:'Data Posted success',
                            createdPost: { 
                              
                                'email':result.email
                            }              
            
                         });
                           
                    });


           })
           .catch((err)=>{

            

                Error:err;

           })


    

    
         
   

});

module.exports=router;