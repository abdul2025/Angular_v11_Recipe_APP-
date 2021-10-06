import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./auth.user.model";

export interface AuthRespData{
    idToken: string,
    email: string,
    refershToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean

}


@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null) 
    token: string | null;

    constructor(private http: HttpClient){}

    singUp(email: string, password: string){
        
        return this.http.post<AuthRespData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbVES37IVuFleeH-6GDJfnOGmniaIINX0', 
        {
            email: email,
            password: password,
            returnScureToken: true
        }
        )
        .pipe(tap(resData => {
            this.handleAuthintication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
                )
            
        
        }),catchError(this.handleError))

    }


    login(email: string, password: string){
        return this.http.post<AuthRespData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbVES37IVuFleeH-6GDJfnOGmniaIINX0', 
        {
            email: email,
            password: password,
            returnScureToken: true
        }
        )
        .pipe(tap(resData => {
                this.handleAuthintication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                    )
                
            
        }),catchError(this.handleError))
    }

    private handleAuthintication(email: string, userId: string, token: string, expiresIn: number) {
        // expiresIn is a sting coming as seconds 
        // and the getTime return with millseconds 
        // multipy the expiresIn by 1000 to have a miliseconds not seconds
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user)
    }

    private handleError(errorRes: HttpErrorResponse){
        console.log(errorRes.error.error.message)
        // Defualt massage
        let errorMessage = 'An unknown error occurred!';
        //  check if that OBJ has error element and nested error elem
        if (!errorRes.error || !errorRes.error.error ) {
            return throwError(errorMessage)
        }
        errorMessage = errorRes.error.error.message

        // for a customized ERROR messages apply the switch cases/
        // switch (errorRes.error.error.message) {
        //     case 'EMAIL_EXISTS':
        //         errorMessage = 'This email exists already';
        //         break;
        //     case "INVALID_PASSWORD":
        //         errorMessage = 'INVALID_PASSWORD, try another one'
        // }
        return throwError(errorMessage)
    }

    
}