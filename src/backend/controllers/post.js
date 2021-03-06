
const PostModel = require('../models/postdatamodel');

exports.createPost=(req,res,next)=>{
     

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

   

 }).catch((err)=>{

     res.status(500).json({

         message:'creating post failed!',
         createdPost: null
            
     });


 });



}



exports.getPost=(req,res,next)=>{
    
    PostModel.findById(req.params.id).then((doc)=>{
        
       if (doc){

        res.status(200).json(

            {message:'Posts get success',post:doc}

        );

       }
       else{

        res.status(404).json(

            {message:'post does not exists',post:null}
            
        );


       }

      



    }).catch((err)=>{

        res.status(500).json(

            {message:'Error occured during get list!',post:null}
            
        );

    });

    
    

}


exports.getPosts=(req,res,next)=>{

    

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

       
        res.status(200).json(

            

            {message:'Posts get success',post:postsInfo,TotalRecords:cnt}
        );

    }).catch((err)=>{

        res.status(500).json(

            {message:'Unable to get posts!',post:null,TotalRecords:null}
        );

    });



   

}


exports.updatePost=(req,res,next)=>{

    let imagePath=req.body.ImagePath;

    

    if (req.file){

        const sURL= req.protocol + "://" + req.get('host');

        imagePath = sURL + '/images/' + req.file.filename;
 

    }

   

    var postData =new PostModel(

        { _id:req.body.Id, Title: req.body.Title, Content:req.body.Content, ImagePath: imagePath  }
  
      );

    
    console.log('update ?');
    console.log(postData);
  
          
    PostModel.updateOne({_id:req.params.id,CreatedBy:req.userInfo.userid},postData).then(

        (oData)=>{

            console.log(oData.nModified);

            if (oData.n>0){

                postData=oData;
           
                res.status(200).json({message:'put ok'});

            }
            else{

                postData=null;
           
                res.status(401).json({message:'Post updatation failed!'});

            }

        }

    ).catch((err)=>{

        res.status(500).json({message:'Error occured during update post!'});

    });

    

  //  PostModel.updateOne()

}


exports.deletePost=(req,res,next)=>{

    
    PostModel.deleteOne({_id:req.params.id,CreatedBy:req.userInfo.userid}).then(

        (resp)=>{

            if (resp.n>0){
                res.status(200).json({message:'deleted one',info:resp});
            }
            else{

                res.status(401).json({message:'Unable to delete',info:resp});
            }
             
        }

    ).catch((err)=>{

        res.status(500).json({message:'Error occured during delete post!',info:null});
    });

   

}