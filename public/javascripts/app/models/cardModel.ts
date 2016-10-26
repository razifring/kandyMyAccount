export class CardModel {
    constructor(public field1: string,
                public field2: string,
                public field3: string) {
    }

    getNumber(){
        return this.field1.toString() + this.field2.toString() + this.field3.toString();
    }

    reset() {
        this.field1 = this.field2 = this.field3 = '';
    }
}