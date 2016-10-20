import {Injectable} from '@angular/core';


@Injectable()
export class CommonUtils {
    constructor( ) {
    }

    static redirectTo(www):void{
       // console.log(www);
        window.location.href = www;
    }
}