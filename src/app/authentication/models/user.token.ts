export class UserToken {
    constructor(
        public login: string,
        public role: string,
        public token: string,
        public name: string
    ){}

}