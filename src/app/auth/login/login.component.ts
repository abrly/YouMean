import { Component, OnInit,OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']

})
export class LoginComponent implements OnInit,OnDestroy{
    isLoading=false;

    private IsAuthenticated = new Subscription();

    constructor(private authService:AuthService){

    }

    ngOnInit(){
        this.IsAuthenticated=this.authService.GetIsUserAuthenticated().subscribe(

            (res)=>{
                if (res==false){
                    this.isLoading=false;
                }
            }

        );
    }

    onLogin(frmLogin:NgForm){

        if (frmLogin.invalid){
            return;
        }
        
        this.isLoading=true;
        this.authService.login(frmLogin.value.email,frmLogin.value.password);


       

    }

    ngOnDestroy(){
        this.IsAuthenticated.unsubscribe();
    }

}