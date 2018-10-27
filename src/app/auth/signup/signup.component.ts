import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']

})
export class SignUpComponent{
    isLoading=false;

    constructor(public authService:AuthService){

    }

    onSignUp(frmSignUp:NgForm){

        console.log(frmSignUp);

        if (frmSignUp.invalid){
            return;
        } 
        this.isLoading=true;
        this.authService.createUser(frmSignUp.value.email,frmSignUp.value.password);

    }

}