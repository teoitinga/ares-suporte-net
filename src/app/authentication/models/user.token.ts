export class UserToken {
    constructor(
        public login: string,
        public role: string,
        public token: string,
        public name: string,
        public municipio: string,
        public esloc: string,
        public eslocName: string,
    ){}

}