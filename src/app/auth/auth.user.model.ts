export class  User {
    constructor(
        public email:string,
        public id: string,
        private _token: string, 
        private _tokenExpirationDate: Date
        /* private and underscore, becouse token and tokenExpirationDate should not be export */
        /* both element should not be retivalable from outside, using only getter and check the validity */
        ) {}


    // Idea here by the getter to validate the expiration of the token and return the token for further usages
    get token() {
        // will chack if the expiration is exisited and not pass by the current time
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token
    }

}

