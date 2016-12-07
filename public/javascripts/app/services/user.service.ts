import {User} from "../dataObjects/user";
import {BehaviorSubject} from "rxjs/Rx";
import {HttpClient} from '../utils/http-client';
import {CommonService} from "./common.service";

/**
 * Created by razih on 10/6/2016.
 */

export class UserService {

    private currentUser;
    private userAccessToken;

    constructor(
        private _http: HttpClient,

    ){}

    public setCurrentUser(user: User) {
        if(!this.currentUser){
            this.currentUser = new BehaviorSubject<User>(user);
        } else {
            this.currentUser.next(user);
        }

        return this;
    }

    public getUserAccessToken(){

            return this.userAccessToken = this._http.get('/api/authentication/uat/'+ this.getCurrentUser().getValue().msisdn)
                .map(CommonService.extractData);

    }

    /**
     *
    * @returns boolean | BehaviorSubject<User>
     */
    getCurrentUser() : BehaviorSubject<User>{
        return this.currentUser;

    }

    resetUser() : void {
        if(this.currentUser){
            this.currentUser.next(false);













































        }
    }
}