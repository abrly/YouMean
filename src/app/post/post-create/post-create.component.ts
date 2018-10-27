import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PostService } from '../post.service';

import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    frmPost:FormGroup;
    postTitle='';
    postData=''; 
    mode:number=0;
    pID:string;

    pIdentifys:string;
    

    postInformation:Post={Id:'',Title:'',Content:'',ImagePath:'',CreatedBy:''};

    isLoading:boolean=false;

    filePreview:string='';
   
  constructor(private postService:PostService,private actvdRoute : ActivatedRoute) { }

  ngOnInit() {

    
    this.frmPost=new FormGroup({

      'Title' : new FormControl(null,{ validators:[Validators.required,Validators.minLength(3)]}),
      'Content' : new FormControl(null,{ validators:[Validators.required,Validators.minLength(5)]}),
      'Image' : new FormControl(null, { validators:[Validators.required] , asyncValidators:[mimeType]})
    });


     this.actvdRoute.paramMap.subscribe((paramMap)=>{

      console.log(paramMap);

        if (paramMap.has('id')){

          this.mode=1;

          this.pID= paramMap.get('id');

          // 

          this.isLoading=true;

          this.postService.GetPost(this.pID).subscribe((res)=>{


            //

            this.isLoading=false;

            this.postInformation.Id=res.post._id;
            this.postInformation.Title=res.post.Title;
            this.postInformation.Content=res.post.Content;
            this.postInformation.ImagePath=res.post.ImagePath;

           this.filePreview=res.post.ImagePath;

            this.frmPost.setValue({

              'Title':  this.postInformation.Title,
              'Content':  this.postInformation.Content,
              'Image' : this.postInformation.ImagePath

            });


            

          });

      

        }
        else
        {

       


          

          this.mode=0;

        }


     });


  }

  addFile(e:Event){

    
    var uploadedFile  = (e.target as HTMLInputElement).files[0];

    this.frmPost.patchValue({

      'Image': uploadedFile

    });

    this.frmPost.get('Image').updateValueAndValidity();

   

    var reader=new FileReader();

    reader.onload=()=>{

      this.filePreview=reader.result;

     

    }
    
    reader.readAsDataURL(this.frmPost.value.Image);

   
    

  }
  

  onNewPost() {

    if (this.frmPost.valid==false)
    {
      
      return;
    }

    
     if (this.mode==0){

      const newPost : Post ={
        "Id":null,
        "Title" : this.frmPost.value.Title,
        "Content" : this.frmPost.value.Content,
        "ImagePath":null,
        "CreatedBy":null
      } 

      

      this.postService.AddPost(newPost.Title,newPost.Content,this.frmPost.value.Image);

     }
     else{


      var updatePost : Post ={
        "Id":this.postInformation.Id,
        "Title" : this.frmPost.value.Title,
        "Content" :this.frmPost.value.Content,
        "ImagePath":this.frmPost.value.Image,
        "CreatedBy" : null
      } 

      console.log('what here');
      console.log(updatePost);

      this.postService.UpdatePost(updatePost.Id,updatePost.Title,updatePost.Content,updatePost.ImagePath);

     }

     

    
      

      this.frmPost.reset()

      console.log('i am added already');

    //  console.log(this.postService.GetPosts());
  }

}
