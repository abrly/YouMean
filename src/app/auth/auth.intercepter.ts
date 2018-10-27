import { HttpInterceptor, HttpHandler,HttpRequest } from "@angular/common/http";
import { Injectable } from "../../../node_modules/@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthIntercepter implements HttpInterceptor{

    constructor(private authService:AuthService){

    }

    intercept(req:HttpRequest<any>,next:HttpHandler){

        console.log(req);

      const token= this.authService.getToken();
    
       const webRequest=req.clone({

        headers:req.headers.set('authorization','Bearer ' + token)

       });

       console.log(webRequest);

       return next.handle(webRequest);

    }

}