import { Component } from '@angular/core';

import { Post } from './post/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YouMEAN';

  postsBucket:Post[]=[];

  storePosts(post:Post){

    console.log('what here');
    console.log(post);

     console.log(post);

      this.postsBucket.push(post);

  }


}
