import {BaseRequestOptions} from "@angular/http";
import {AuthService} from "../services/auth.service";
/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
export class CustomRequestOptions extends BaseRequestOptions {
    constructor(
        private authService: AuthService
    ) {
        super();

        this.headers.append('Authorization', authService.token);
    }
}