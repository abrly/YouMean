const express=require('express');
const app= express();

var mongoose=require('mongoose');

const bodyParser=require('body-parser');

const postRouter=require('./Routes/posts');
const userRouter=require('./Routes/user');

const path = require('path');


mongoose.connect('mongodb+srv://abrly:vTqtCWJgSuV9Utfv@mongocluster-qntx9.mongodb.net/postDB?retryWrites=true')
.then((res)=>{
    console.log('db connection succeeded!')
})
.catch((err)=>{
    console.log('db connection failed!')
});  

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extened:false}));
app.use('/images',express.static(path.join('src/backend/images')));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-with,Content-Type,Accept,authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    next();
});


app.use('/api/posts',postRouter)
app.use('/api/user',userRouter)

module.exports=app;


