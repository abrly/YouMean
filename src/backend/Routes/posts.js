const express=require('express');

const router=express.Router();

const authVerification=require('./../middlewares/auth.verify');

const fileProcessor=require('./../middlewares/file');

const postController=require('../controllers/post');

router.post('',authVerification, fileProcessor ,postController.createPost);

router.get('/:id',postController.getPost);

router.get('',postController.getPosts);

router.put('/:id',authVerification, fileProcessor,postController.updatePost);

router.delete('/:id',authVerification,postController.deletePost);

module.exports= router;