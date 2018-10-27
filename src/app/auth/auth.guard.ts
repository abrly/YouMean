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

        console.log('Auth Guard here');
        console.log(isAuthDone);

        if (!isAuthDone){
           this.router.navigate(['/Login']);
        }

        return true;
        
      }
      


}
