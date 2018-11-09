import { NgModule } from "@angular/core";
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module'
import { CommonModule } from "@angular/common";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { AuthRoutingModule } from "./authRouting.module";

@NgModule({

    declarations: [
       
        LoginComponent,
        SignUpComponent
        
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        AngularMaterialModule,
        CommonModule,
        AuthRoutingModule
    ],


})
export class AuthModule{


}