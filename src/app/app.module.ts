import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {AngularMaterialModule} from './angular-material.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { PostService } from './post/post.service';

import { AuthIntercepter } from './auth/auth.intercepter';
import { ErrorIntercepter } from './error.interceptor';
import { ErrorComponent } from './error/error.component';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    PostModule,
    AuthModule
    
  ],
  providers: [PostService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthIntercepter,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorIntercepter,multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]

})
export class AppModule { }
