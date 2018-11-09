import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{

    isAuthDone=false;

    constructor(private authService:AuthService,private router:Router){

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean { 

         const isAuthDone=this.authService.getAuthStatus();

       

        if (!isAuthDone){
           this.router.navigate(['/auth/Login']);
        }

        return true;
        
      }
      


}
