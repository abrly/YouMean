import { Component, OnInit } from '@angular/core';

import { Post } from './post/post.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'YouMEAN';

  constructor(private authService:AuthService){

  }

  ngOnInit(){

    this.authService.autoAuthUser();

  }

  postsBucket:Post[]=[];

  storePosts(post:Post){

    console.log('what here');
    console.log(post);

     console.log(post);

      this.postsBucket.push(post);

  }


}
