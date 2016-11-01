import {Injectable} from '@angular/core';


@Injectable()
export class CommonUtils {
    constructor( ) {
    }

    static redirectTo(www):void{
       // console.log(www);
        window.location.href = www;
    }

    static cleanPhonenumber(phonenumber):string{
        phonenumber = phonenumber.replace(/-|\s/g, '');

        // remove leading zeros
        if(phonenumber[0] === '0')
        {
            phonenumber = phonenumber.replace(/^0+/, '');
        }

        return phonenumber;
    }
}