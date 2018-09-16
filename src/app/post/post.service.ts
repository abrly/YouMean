import { Injectable } from "../../../node_modules/@angular/core";

import { Post } from './post.model';

import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from "../../../node_modules/@angular/common/http";

import { Router} from '@angular/router';


@Injectable()
export class PostService{

    constructor(private httpClient:HttpClient,private router:Router){}

    private postAddedSubject=new Subject<{posts:Post[],totalCount:number}>();

    private posts:Post[]=[];

    private post:Post;


    GetPost(postId:string){
      
         return this.httpClient.get<{message:string,post:{_id:string,Title:string,Content:string,ImagePath:string}}>
            ('http://localhost:3000/api/posts/'+ postId);
       
    }

          

   GetPosts(pageSize:number,currentPage:number){

      console.log('how many hits');

        var queryParams=`?PageSize=${pageSize}&CurrentPage=${currentPage}`;

        this.httpClient.get<{message:string,post:any,TotalRecords:number}>('http://localhost:3000/api/posts'+ queryParams)
        .pipe(map((postInfo)=>{

           

            return { post: postInfo.post.map(

                (post)=>{

                    return { 
                    
                          Title:post.Title,
                          Content:post.Content,
                          Id:post._id,
                          ImagePath:post.ImagePath

                     }

                }



            ),max:postInfo.TotalRecords};


        }))
       .subscribe(
            (TransformedpostInfo)=>{
               

               this.posts=TransformedpostInfo.post;

              

               this.postAddedSubject.next({posts:[...this.posts],totalCount:TransformedpostInfo.max});


            }
        );

    }

    GetSubscribedPosts(){

        
      //  this.GetPosts(pageSize,currentPage);
        return this.postAddedSubject.asObservable();

    }


    DeletePost(id:string){

        /* this.httpClient.delete<{message:string}>('http://localhost:3000/api/posts/'+ id).subscribe((res)=>{

           

            const updatedPosts= this.posts.filter(post=> post.Id !== id );
          
            this.posts=updatedPosts;

           

            this.postAddedSubject.next([...this.posts]);

        }); */


       return this.httpClient.delete<{message:string}>('http://localhost:3000/api/posts/'+ id);
    

    }


    UpdatePost(Id:string,Title:string,Content:string,Image : File | string){

        let PostData: Post | FormData;

        if (typeof Image === "object"){

            PostData= new FormData();
            PostData.append('Id',Id);
            PostData.append('Title',Title);
            PostData.append('Content',Content);
            PostData.append('Image',Image,Title);

            console.log('i am here');
            console.log(Image);
            console.log('up');

        } else{

            PostData={

                'Id':Id,
                'Title':Title,
                'Content':Content,
                'ImagePath':Image
                

            };
        }

        var postContent:Post={Id:Id,Title:Title,Content:Content, ImagePath:null};

        console.log('chek');

        console.log(Id);
        
        console.log(PostData);
        
        this.httpClient.put('http://localhost:3000/api/posts/'+ Id,PostData).subscribe((res)=>{

            
            this.router.navigate(['/']);
        });

    }


    AddPost(sTitle:string,sContent:string,imageFile:File){

      var frmPostFormData= new FormData();

      frmPostFormData.append('Title',sTitle);
      frmPostFormData.append('Content',sContent);
      frmPostFormData.append('Image',imageFile,sTitle);

    
      // var postContent:Post={Id:null,Title:sTitle,Content:sContent};

       this.httpClient.post<{message:string,createdPost:{'Id':string,'Title':string,'Content':string,'ImagePath':string}}>('http://localhost:3000/api/posts',frmPostFormData).subscribe(

            (res)=>{

               

               // var postContent:Post={Id:null,Title:sTitle,Content:sContent, ImagePath:null};

               // postContent.Id= res.createdPost.Id;
               // postContent.Title=sTitle;
               // postContent.Content=sContent;
               // postContent.ImagePath=res.createdPost.ImagePath;

               // this.posts.push(postContent);

             
            
             //  this.GetPosts();

             //  this.postAddedSubject.next({[...this.posts]);

               this.router.navigate(['/']);
               

            }

        );

        
       

    }

}