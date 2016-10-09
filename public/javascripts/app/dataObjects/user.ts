export class User {
    public msisdn: string;

    public static create(_msisdn:string){
        var model = new User();
        model.msisdn = _msisdn;
        return model;
    }
}