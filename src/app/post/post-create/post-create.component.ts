import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    postData='';
    postInformation='';

  constructor() { }

  ngOnInit() {
  }

  onNewPost() {

      this.postInformation=this.postData;

  }

}
