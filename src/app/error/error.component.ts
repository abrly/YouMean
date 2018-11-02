import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/Material";

@Component({
    templateUrl:'./error.component.html'
})


export class ErrorComponent{

    constructor(@Inject(MAT_DIALOG_DATA) public data: {message:string}){

    }

    private ErrorMsg:string='Unknow Error';



}