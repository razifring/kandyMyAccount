import {HttpClient} from '../utils/http-client';
import {User} from "../dataObjects/user";
import {BehaviorSubject} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {CommonService} from "./common.service";
/**
 * Created by razih on 10/6/2016.
 */
@Injectable()
export class UserService {

    private currentUser;
    constructor(
        private _http: HttpClient
    ){}
    public setCurrentUser(user: User) {
        if(!this.currentUser){
            this.currentUser = new BehaviorSubject<User>(user);
        } else {
            this.currentUser.next(user);
        }

        return this;
    }

    getUserAccessToken(){
        return this._http.get('/api/authentication/uat/')
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