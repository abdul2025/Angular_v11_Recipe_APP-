import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType} from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, switchMap, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import * as AuthActions from './auth.actions'




export interface AuthRespData{
    idToken: string,
    email: string,
    refershToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean

}


@Injectable()


export class AuthEffects {
    // Actions gives access to all dispatch actions, so you can react to them
    // login$ = createEffect(()=>{
    //     return 
    // })

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
                        map(resDate => {
                            const expirationDate = new Date(new Date().getTime() + +resDate.expiresIn * 1000);
                            return new AuthActions.Login(
                                {
                                    email: resDate.email,
                                    userId: resDate.localId,
                                    token: resDate.idToken,
                                    expirationDate: expirationDate
                                })
                        }),
                        catchError(error => {
                        //...

                        //>>> of() is to return the error as observable
                        return of();

                    }), );
            }) 
    
        )
    
        @Effect({dispatch: false})
        authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(()=> {
            this.router.navigate(['/']);
        }))


    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}