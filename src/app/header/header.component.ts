import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthDone:boolean=false;

  constructor(private authService:AuthService) { }

  private authSubscription:Subscription;

  

  ngOnInit() {

    this.isAuthDone=this.authService.getAuthStatus();

    this.authSubscription=this.authService.GetIsUserAuthenticated()
                          .subscribe((authStatus)=>{

                              this.isAuthDone=authStatus

                          });

  }

  ngOnDestroy(){

    this.authSubscription.unsubscribe();

  }

  onLogout(){

      this.authService.logout();

  }

}
