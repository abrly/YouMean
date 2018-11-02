import { Component, OnInit, OnDestroy, } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";


@Component({
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']

})
export class SignUpComponent implements OnInit, OnDestroy{
    isLoading=false;

    private IsAuthenticated = new Subscription();

   

    constructor(public authService:AuthService){

    }

    ngOnInit(){
        this.IsAuthenticated = this.authService.GetIsUserAuthenticated().subscribe(

            (res)=>{

                if (res==false){
                    this.isLoading=false;
                }

            }

        );
    }

    onSignUp(frmSignUp:NgForm){

       

        if (frmSignUp.invalid){
            return;
        } 
        this.isLoading=true;
        this.authService.createUser(frmSignUp.value.email,frmSignUp.value.password);

    }

    ngOnDestroy(){
        this.IsAuthenticated.unsubscribe();
    }

}