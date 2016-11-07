import {User} from "../dataObjects/user";
import {BehaviorSubject} from "rxjs/Rx";
/**
 * Created by razih on 10/6/2016.
 */

export class UserService {

    private currentUser;

    public setCurrentUser(user: User) {
        if(!this.currentUser){
            this.currentUser = new BehaviorSubject<User>(user);
        } else {
            this.currentUser.next(user);
        }

        return this;
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