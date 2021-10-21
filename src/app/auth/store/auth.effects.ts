import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType} from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, switchMap, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { AuthService } from '../auth.service'
import { User } from '../auth.user.model'
import * as AuthActions from './auth.actions'




export interface AuthRespData{
    idToken: string,
    email: string,
    refershToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean

}

const handleAuthentication = (expiresIn: number, email: string, localId: string, idToken) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(email, localId, idToken, expirationDate)
    localStorage.setItem('userDate', JSON.stringify(user))

    return new AuthActions.AuthenticationSuccess(
        {
            email: email,
            userId:localId,
            token: idToken,
            expirationDate: expirationDate,
            redirect: true

        })
};


const handleError = (error) => {
    let errorMessage = 'An unknown error occurred!';
    if (!error.error || !error.error.error) {
      return of(new AuthActions.AuthenticationFail(errorMessage));
    }
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    //>>> of() is to return the error as observable
    return of(new AuthActions.AuthenticationFail(errorMessage));
};


@Injectable()

export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.Signup)=>{
            return this.http.post<AuthRespData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`, 
        {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnScureToken: true
        }).pipe(
            tap((resDate)=> {
                console.log(+resDate.expiresIn * 1000)
                this.authService.setLogoutTimer(+resDate.expiresIn * 1000)
            }), 
            map(
                resDate=>{
                   return handleAuthentication(+resDate.expiresIn, resDate.email, resDate.localId, resDate.idToken)
                }
            ),catchError(errorRes => {
                //...
                return handleError(errorRes)

            }) )
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authDate: AuthActions.LogingStart) => {
                return this.http.post<AuthRespData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`, 
                    {
                        email: authDate.payload.email,
                        password: authDate.payload.password,
                        returnSecureToken: true
                    }).pipe(
                        tap((resDate)=> {
                            console.log(+resDate.expiresIn * 1000)
                            this.authService.setLogoutTimer(+resDate.expiresIn * 1000)
                        }), 
                        map(resDate => {
                            
                            return handleAuthentication(+resDate.expiresIn, resDate.email, resDate.localId, resDate.idToken)
                        }),
                        catchError(errorRes => {

                        //...
                            return handleError(errorRes)

                    }), );
            }) 
    
        )
    
        @Effect({dispatch: false})
        authSuccess = this.actions$.pipe(ofType(AuthActions.AUTHINTICATE_SUCCESS, AuthActions.LOGOUT),
        tap((AuthenticationSuccess: AuthActions.AuthenticationSuccess)=> {
            if (AuthenticationSuccess){
                if (AuthenticationSuccess.payload.redirect) {
                    this.router.navigate(['/']);
                }
            }
        }))

        @Effect({dispatch: false})
        authLogout = this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(()=> {
            this.router.navigate(['/auth']);

            this.authService.clearLogoutTimer()
            localStorage.removeItem('userDate')

        }))

        @Effect()
        autoLogin = this.actions$.pipe(
            ofType(AuthActions.AUTOLOGIN),
            map(() =>{
                const userDate : {
                    email: string,
                    id: string,
                    _token: string,
                    _tokenExpirationDate: string
                } = JSON.parse(localStorage.getItem('userDate'))
                console.log(userDate)
                if (!userDate) { 
                    return {type: 'DUMMY'}

                }
        
                const loadedUser = new User(userDate.email, userDate.id, userDate._token, new Date(userDate._tokenExpirationDate))
                
                console.log(loadedUser)
        
                if (loadedUser.token) {
                    // this.user.next(loadedUser)
                    const expirationDuration = new Date(userDate._tokenExpirationDate).getTime()  - new Date().getTime()
                    this.authService.setLogoutTimer(expirationDuration)
                    return new AuthActions.AuthenticationSuccess(
                      {
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        token: loadedUser.token,
                        expirationDate:new Date(userDate._tokenExpirationDate), 
                        redirect: false
                      });
        
                }
                return {type: 'DUMMY'}
            })
            )


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService 
        ) {}
}