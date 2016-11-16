export class User {
    public msisdn: string;
    public isPremium: boolean;

    public static create(_msisdn:string, _isPremium:boolean){
        var model = new User();
        model.msisdn = _msisdn;
        model.isPremium = _isPremium;
        return model;
    }
}