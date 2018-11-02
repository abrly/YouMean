import { Component, OnInit , OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/Material";
import { Post } from '../post.model';
import { PostService } from "../post.service";
import { Subscription } from 'rxjs';
import { AuthService } from "../../auth/auth.service";


@Component({

    selector:'app-post-list',
    templateUrl: 'post-list.component.html',
    styleUrls:['post-list.component.css']

})

export class PostListComponent implements OnInit,OnDestroy {

    isAuthDone:boolean=false;

    UserID:string;

    posts:Post[];

    isLoading:boolean=false;

    constructor(private postService:PostService,private authService:AuthService){

        this.posts=[];

    };

    PageLength : number;
    PageSize: number=3;
    pageSizeOptions = [3,5,10, 25, 100];
    currentPage:number=1;

   // @Input() postReceiver;

   /* posts=[
        
            {"Title" : 'First Post',"Content" : 'This is my first post'},
            {"Title" : 'Second Post',"Content" : 'This is my second\'s post'},
            {"Title" : 'Third Post',"Content" : 'This is my third post'},

    ] */

    authSubscription=new Subscription();
    getPostSubscription= new Subscription();

    

    ngOnInit(){

        this.isLoading=true;

        this.postService.GetPosts(this.PageSize,this.currentPage);
        this.UserID=this.authService.getAuthUserID();
       
        this.getPostSubscription = this.postService.GetSubscribedPosts()
                                   .subscribe((p:{posts:Post[],totalCount:number})=>{

                                    this.isLoading=false;

                                        this.posts=p.posts;
                                        this.PageLength=p.totalCount;

                                      

                                       

                                   });

        this.isAuthDone=this.authService.getAuthStatus();
        this.authSubscription=this.authService.GetIsUserAuthenticated()
                                   .subscribe((authStatus)=>{
     
                                     
                                     
                                     this.isAuthDone=authStatus;
                                     this.UserID=this.authService.getAuthUserID();
     
                                   });
                                  
                                  

       

        

    }

    ngOnDestroy(){

        this.getPostSubscription.unsubscribe();
        this.authSubscription.unsubscribe();

    }
    
    OnDeletePost(id){

        

        this.postService.DeletePost(id).subscribe((msg)=>{

            this.postService.GetPosts(this.PageSize,this.currentPage);

        },(err)=>{

            this.isLoading=false;
        });
        
    }

    onPageChange(evnt:PageEvent){



        this.isLoading=true;
        this.currentPage=evnt.pageIndex+1;
        this.PageSize=evnt.pageSize;
        this.postService.GetPosts(this.PageSize,this.currentPage);
        
    }
   

}