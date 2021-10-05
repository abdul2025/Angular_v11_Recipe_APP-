import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthRespData{
    idToken: string,
    email: string,
    refershToken: string,
    expiresIn: string,
    localId: string
}


@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient){}

    singUp(email: string, password: string){
        return this.http.post<AuthenticatorResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbVES37IVuFleeH-6GDJfnOGmniaIINX0', 
        {
            email: email,
            password: password,
            returnScureToken: true
        }
        )

    }

}