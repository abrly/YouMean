import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostListComponent } from './post/post-list/post-list.component';


import { MatInputModule, 
         MatButtonModule, 
         MatCardModule,
         MatToolbarModule,
         MatExpansionModule, 
         MatMenuModule, 
         MatProgressSpinnerModule,
         MatPaginatorModule        
        } from '@angular/Material';
import { HeaderComponent } from './header/header.component';
import { PostService } from './post/post.service';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthIntercepter } from './auth/auth.intercepter';



@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule  
  ],
  providers: [PostService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthIntercepter,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
