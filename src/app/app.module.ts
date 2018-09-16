import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

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



@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
