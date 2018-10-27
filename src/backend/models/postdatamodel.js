const mongoose=require('mongoose');

const postSchema=mongoose.Schema({

    id: { type : String },
    Title: { type : String, required:true },
    Content: { type : String, required:true },
    ImagePath: { type : String, required:true },
    CreatedBy: { type : mongoose.Schema.Types.ObjectId,ref:"userModel", required:true },

});

var modelPost=mongoose.model('postModel',postSchema);

module.exports=modelPost;