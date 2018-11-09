import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Auth } from '../auth/auth.model';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { environment } from '../../environments/environment';

const BACKEND_URL=environment.apiURL + 'user/';



@Injectable({providedIn:"root"})
export class AuthService{

    private isAuthenticated:boolean=false;

    private token:string;

    private tokenTimer:any;

    private UserID:string;

    getToken(){
        return this.token;
    }
    
    getAuthUserID(){
        
        return this.UserID;

    }

    getAuthStatus(){
       
        return this.isAuthenticated;
    }

    private IsUserAuthenticated = new Subject<boolean>();

    GetIsUserAuthenticated(){


        return this.IsUserAuthenticated.asObservable();
    }

    constructor(public httpClient:HttpClient,private router:Router){
    }

    createUser(email:string,password:string){

        

       var authData:Auth = {email:email,password:password};
      
       

        this.httpClient.post(BACKEND_URL + 'signup',authData)
            .subscribe(

                (resp)=>{

                    console.log('1');
                    console.log(resp);
                    
                    this.router.navigate(['/']);

                },
                (err)=>{

                    console.log('i get err');
                    console.log(err);
                    console.log('before me');

                    this.IsUserAuthenticated.next(false);


                }

            ); 

    }

    //login

    login(email:string,password:string){

        

       var authData:Auth = {email:email,password:password};
      
       

        this.httpClient.post<{WebToken:string,ExpiresIn:number,UserID:string}>( BACKEND_URL + 'login',authData)
            .subscribe(

                (resp)=>{

                    this.token=resp.WebToken;

                    const expiresInDuration=resp.ExpiresIn;
                    
                    this.tokenTimer = this.setAuthTimer(expiresInDuration);

                    if (this.token){
                        this.isAuthenticated=true;
                        this.IsUserAuthenticated.next(this.isAuthenticated);

                        const currentDateTime= new Date();

                        this.UserID= resp.UserID;

                        const expirationDate = new  Date(currentDateTime.getTime() + expiresInDuration * 1000);

                        

                        this.saveAuthData(this.token,expirationDate,resp.UserID);

                        this.router.navigate(['/']);
                    }
                    

                },
                (err)=>{

                    console.log('i get error');
                    console.log(err);
                    this.IsUserAuthenticated.next(false);
                }

            ); 

    }

    logout(){

        this.token=null;
        this.isAuthenticated=false;
        this.IsUserAuthenticated.next(this.isAuthenticated);
        this.UserID=null;
        this.clearAuthData();
            
        this.router.navigate(['/']);
        clearTimeout(this.tokenTimer);

    }

    private saveAuthData(token:string,expiration:Date,UserID:string){

        localStorage.setItem('token',token);
        localStorage.setItem('expiration',expiration.toISOString());
        localStorage.setItem('UserID',UserID);


    }

    private clearAuthData(){

        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('UserID');


    }

    setAuthTimer(duration:number){

        setTimeout(()=>{

            this.logout();

        }, duration * 1000);

    }

    autoAuthUser(){

        const authInfo= this.getAuthData();

        if (authInfo){

            const cDatetime = new Date();
            const expiresIn=(authInfo.expiresIn.getTime() - cDatetime.getTime());

            if (expiresIn>0){

                this.setAuthTimer(expiresIn/1000);

                this.token=authInfo.token;
                this.isAuthenticated=true;
                this.UserID=authInfo.UserID;
                this.IsUserAuthenticated.next(true);

            }


        }


    }

    private getAuthData(){
        
        const token=localStorage.getItem("token");
        const expiresIn=localStorage.getItem("expiration");
        const UserID=localStorage.getItem("UserID");

        if (!token || !expiresIn){
            return;
        }

        return {

            'token' : token,
            'expiresIn': new Date(expiresIn),
            'UserID': UserID

        }

    }
    
}