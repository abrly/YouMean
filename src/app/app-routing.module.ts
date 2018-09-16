import { NgModule } from "@angular/core";
import { RouterModule,Routes } from '@angular/router'
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostCreateComponent } from "./post/post-create/post-create.component";

const myAppRoutes:Routes=[

    { path:'',component:PostListComponent },
    { path:'AddNew',component:PostCreateComponent },
    { path:'Edit/:id',component:PostCreateComponent },

];


@NgModule({

   imports:[

        RouterModule.forRoot(myAppRoutes)

   ],
   exports:[

    RouterModule

   ]

})
export class AppRoutingModule{


}