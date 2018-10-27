import { NgModule } from "@angular/core";
import { RouterModule,Routes } from '@angular/router'
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostCreateComponent } from "./post/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const myAppRoutes:Routes=[

    { path:'',component:PostListComponent },
    { path:'AddNew',component:PostCreateComponent,canActivate:[AuthGuard] },
    { path:'Edit/:id',component:PostCreateComponent ,canActivate:[AuthGuard] },
    { path:'Login',component:LoginComponent },
    { path:'SignUp',component:SignUpComponent },
];


@NgModule({

   imports:[

        RouterModule.forRoot(myAppRoutes)

   ],
   exports:[

    RouterModule

   ],
   providers:[AuthGuard]

})
export class AppRoutingModule{


}