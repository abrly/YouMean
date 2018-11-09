
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userdatamodel');
const jwt = require('jsonwebtoken');

exports.loginUser =(req,res,next)=>{

    userInfo:UserModel;
    
    console.log('why here');
    console.log(req.body.email);

    UserModel.findOne({email:req.body.email})
    .then((user)=>{

        console.log('1');
        console.log(user);

        if (!user){

            console.log('2');

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
                              process.env.JWT_KEY,{expiresIn:'1hr'}
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
            message:"error occured"
        });

    });

}


exports.createUser=(req,res,next)=>{



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


    

    
         
   

}