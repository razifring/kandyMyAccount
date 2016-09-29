import {Response} from '@angular/http';

export class CommonService {
    public static extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}