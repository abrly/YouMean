const jwt= require('jsonwebtoken');

module.exports=((req,res,next)=>{

    try{

        var token=req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token,"secret_is_here");

       

        const userInfo={email:decodedToken.email,userid:decodedToken.userid}

        req.userInfo=userInfo;

        next();

    }
    catch(error){

        return res.status('500').json({
            message:"Authentication failed!"
        });

    }


});