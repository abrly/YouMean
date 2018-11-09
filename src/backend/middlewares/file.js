
const multer=require('multer');

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

module.exports=multer({storage:storeConfig}).single('Image');