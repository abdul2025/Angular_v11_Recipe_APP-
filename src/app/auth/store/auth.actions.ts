import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] login start';
export const AUTHINTICATE_SUCCESS = '[Auth] login';
export const AUTOLOGIN = '[Auth] auto login';
export const AUTHINTICATE_FAIL = '[Auth] login Fail';
export const LOGOUT = '[Auth] logout';
export const CLEAR_ERROR = '[Auth] clear error';
export const SIGNUP_START = '[Auth] signup start';


export class AuthenticationSuccess implements Action {

readonly type = AUTHINTICATE_SUCCESS

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



export class AuthenticationFail implements Action {
    readonly type = AUTHINTICATE_FAIL;

    constructor(public payload: string){ }
}



export class Signup implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string, password: string}){ }

}


export class ClearError implements Action {
    readonly type = CLEAR_ERROR;

}


export class AutoLogin implements Action {
    readonly type = AUTOLOGIN;

 

}

export type AuthActions = 
    | AuthenticationSuccess
    | Logout
    | LogingStart
    | AuthenticationFail
    | Signup
    | ClearError 
    | AutoLogin

