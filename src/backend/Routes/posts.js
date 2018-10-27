const express=require('express');

const multer=require('multer');

const router=express.Router();

const authVerification=require('./../middlewares/auth.verify');


const MIME_TYPE_MAP = {

    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
    'image/gif' : 'gif'
}

var storeConfig=multer.diskStorage(

    {

        destination: (req,file,cb)=>{

            const isValid =MIME_TYPE_MAP[file.mimetype];

            let err =new Error('Invalid Mime Type');
             
            if (isValid){

                err=null;

            }

           
            
                cb(err,'src/backend/images');

            


           
        },

        filename: (req,file,cb)=>{

            const name = file.originalname.toLowerCase().split(' ').join('_');
            const extn =MIME_TYPE_MAP[file.mimetype];
            cb(null,name+'_'+Date.now()+'.'+extn);


        }

    }

);


const PostModel = require('../models/postdatamodel');

router.post('',authVerification, multer({storage:storeConfig}).single('Image') ,(req,res,next)=>{

      

       const sURL= req.protocol + "://" + req.get('host');

       const sImageURL = sURL + '/images/' + req.file.filename;

      

       const postData =new PostModel(

      {
          Title: req.body.Title, 
          Content:req.body.Content,
          ImagePath:sImageURL,
          CreatedBy:req.userInfo.userid      
        
        }

    );

  

    postData.save().then((result)=>{

       

        res.status(201).json({

            message:'Data Posted success',
            createdPost: { 
              

                    'Id' : result._id,
                    'Title':result.Title,
                    'Content' : result.Content,
                    'ImagePath':result.ImagePath
               

             }
               
        });

      

    });

  

});


router.get('/:id',(req,res,next)=>{
    
    PostModel.findById(req.params.id).then((doc)=>{
        
       if (doc){

        res.status(200).json(

            {message:'Posts get success',post:doc}

        );

       }
       else{

        res.status(404).json(

            {message:'post not exists',post:null}
            
        );


       }

      



    });

    
    

});


router.get('',(req,res,next)=>{

    

    const pageSize=+req.query.PageSize;
    const currentPage=+req.query.CurrentPage;

    

    const postQuery=PostModel.find();
    if (pageSize && currentPage){

        postQuery
        .skip(pageSize *(currentPage-1))
        .limit(pageSize)
    }
    
    
    var postsInfo=[];

    postQuery.then((docs)=>{
        
        postsInfo=docs;

        return PostModel.count();
      

    }).then((cnt)=>{

        console.log('TotalRecs');
        console.log(cnt);
        res.status(200).json(

            

            {message:'Posts get success',post:postsInfo,TotalRecords:cnt}
        );

    });



   

});


router.put('/:id',authVerification, multer({storage:storeConfig}).single('Image'),(req,res,next)=>{

    let imagePath=req.body.ImagePath;

    

    if (req.file){

        const sURL= req.protocol + "://" + req.get('host');

        imagePath = sURL + '/images/' + req.file.filename;
 

    }

    console.log('image hre');
    console.log(imagePath);

    var postData =new PostModel(

        { _id:req.body.Id, Title: req.body.Title, Content:req.body.Content, ImagePath: imagePath  }
  
      );

    
    console.log(postData);
          
    PostModel.updateOne({_id:req.params.id,CreatedBy:req.userInfo.userid},postData).then(

        (oData)=>{

            if (oData.nModified>0){

                postData=oData;
           
                res.status(200).json({message:'put ok'});

            }
            else{

                postData=null;
           
                res.status(401).json({message:'Not Authorized'});

            }

          

         


        }

    );

    

  //  PostModel.updateOne()

});

router.delete('/:id',authVerification,(req,res,next)=>{

    
    PostModel.deleteOne({_id:req.params.id,CreatedBy:req.userInfo.userid}).then(

        (resp)=>{

            if (resp.n>0){
                res.status(200).json({message:'deleted one',info:resp});
            }
            else{

                res.status(401).json({message:'Not Authorized',info:resp});
            }

            
             
        }

    );

   

});

module.exports= router;