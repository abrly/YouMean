import { NgModule } from "@angular/core";
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./signup/signup.component";


const myRoutes:Routes=[
    
  
];


@NgModule({

    imports:[

        RouterModule.forChild(myRoutes)

   ],
   exports:[

    RouterModule

   ]

})
export class AuthRoutingModule{


}