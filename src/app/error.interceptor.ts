import { HttpInterceptor, HttpHandler,HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/Material";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorIntercepter implements HttpInterceptor{

   constructor(private dialog:MatDialog){

   }

    intercept(req:HttpRequest<any>,next:HttpHandler){
      
      
      
         
         return next.handle(req).pipe(

            catchError((error:HttpErrorResponse)=>{

               // alert(error.message);

               var errorMessage='An Unknow Error Occured';

               if (error.error.message)
               {
                 errorMessage=error.error.message;
               }

               this.dialog.open(ErrorComponent,{data:{message:errorMessage}});

                return throwError(error);

            })

         );
  
      }

}