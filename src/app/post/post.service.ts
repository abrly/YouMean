import { Injectable } from "@angular/core";

import { Post } from './post.model';

import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from "@angular/common/http";

import { Router} from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL=environment.apiURL + 'posts';


@Injectable()
export class PostService{

    constructor(private httpClient:HttpClient,private router:Router){}

    private postAddedSubject=new Subject<{posts:Post[],totalCount:number}>();

    private posts:Post[]=[];

    private post:Post;


    GetPost(postId:string){
      
         return this.httpClient.get<{message:string,post:{_id:string,Title:string,Content:string,ImagePath:string}}>
            (BACKEND_URL+ postId);
       
    }

          

   GetPosts(pageSize:number,currentPage:number){

      

        var queryParams=`?PageSize=${pageSize}&CurrentPage=${currentPage}`;

        this.httpClient.get<{message:string,post:any,TotalRecords:number}>(BACKEND_URL+ queryParams)
        .pipe(map((postInfo)=>{

           

            return { post: postInfo.post.map(

                (post)=>{

                    return { 
                    
                          Title:post.Title,
                          Content:post.Content,
                          Id:post._id,
                          ImagePath:post.ImagePath,
                          CreatedBy:post.CreatedBy

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


       return this.httpClient.delete<{message:string}>(BACKEND_URL+ id);
    

    }


    UpdatePost(Id:string,Title:string,Content:string,Image : File | string){

        let PostData: Post | FormData;

        if (typeof Image === "object"){

            PostData= new FormData();
            PostData.append('Id',Id);
            PostData.append('Title',Title);
            PostData.append('Content',Content);
            PostData.append('Image',Image,Title);

          

        } else{

            PostData={

                'Id':Id,
                'Title':Title,
                'Content':Content,
                'ImagePath':Image,
                'CreatedBy' : null
                

            };
        }

        var postContent:Post={Id:Id,Title:Title,Content:Content, ImagePath:null,CreatedBy:null};

       
        
        this.httpClient.put(BACKEND_URL+ Id,PostData).subscribe((res)=>{

            
            this.router.navigate(['/']);
        });

    }


    AddPost(sTitle:string,sContent:string,imageFile:File){

      var frmPostFormData= new FormData();

      frmPostFormData.append('Title',sTitle);
      frmPostFormData.append('Content',sContent);
      frmPostFormData.append('Image',imageFile,sTitle);

    
      // var postContent:Post={Id:null,Title:sTitle,Content:sContent};

       this.httpClient.post<{message:string,createdPost:{'Id':string,'Title':string,'Content':string,'ImagePath':string}}>(BACKEND_URL,frmPostFormData).subscribe(

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