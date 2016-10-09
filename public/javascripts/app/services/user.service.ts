import {User} from "../dataObjects/user";
/**
 * Created by razih on 10/6/2016.
 */

export class UserService {

    private currentUser;

    public setCurrentUser(user: User) {
        this.currentUser = user;
        return this;
    }

    getCurrentUser() : User{
        return this.currentUser;
    }
}