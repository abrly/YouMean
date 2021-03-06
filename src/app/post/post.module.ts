import { NgModule } from "@angular/core";
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import {AngularMaterialModule} from '../angular-material.module'
import { CommonModule } from "@angular/common";

@NgModule({

    declarations: [
        PostCreateComponent,
        PostListComponent
        
    ],
    imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        CommonModule
    ]
    

})
export class PostModule{


}