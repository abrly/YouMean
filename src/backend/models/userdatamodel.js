const mongoose=require('mongoose');
const mongooseUniqueValidator=require('mongoose-unique-validator');
const userSchema=mongoose.Schema({
  
    email: { type : String, required:true, unique:true },
    password: { type : String, required:true }
    
    
});

userSchema.plugin(mongooseUniqueValidator);

var modelUser=mongoose.model('userModel',userSchema);

module.exports=modelUser;