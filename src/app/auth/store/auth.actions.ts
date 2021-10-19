import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] login start';
export const LOGIN = '[Auth] login';
export const LOGIN_FAIL = '[Auth] login Fail';
export const LOGOUT = '[Auth] logout';


export class Login implements Action {

readonly type = LOGIN

    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT
}


export class LogingStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {email: string, password: string}){ }
}


export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string){ }
}

export type AuthActions = Login | Logout | LogingStart | LoginFail ;

