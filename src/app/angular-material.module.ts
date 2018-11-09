import { NgModule } from "@angular/core";

import { MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule, 
    MatMenuModule, 
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule        
   } from '@angular/Material';


@NgModule({

    imports:[

        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule

    ],
    exports:[

        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule

    ]


   
})
export class AngularMaterialModule{


}