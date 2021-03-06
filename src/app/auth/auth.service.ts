import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";


import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'



// export interface AuthRespData{
//     idToken: string,
//     email: string,
//     refershToken: string,
//     expiresIn: string,
//     localId: string,
//     registered?: boolean

// }


@Injectable({providedIn: 'root'})
export class AuthService {

    // user = new BehaviorSubject<User>(null)
    
    private tokenExpirationTimer: any;

    constructor(
      // private http: HttpClient,
      // private router: Router,
      private store: Store<fromApp.AppState>
      ){}


      /*
        Comment out the login and sign up and handleError service as (Functions) ---> this is been handle by the ngrx 
      */ 
    // singUp(email: string, password: string){
        
    //     return this.http.post<AuthRespData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`, 
    //     {
    //         email: email,
    //         password: password,
    //         returnScureToken: true
    //     }
    //     )
    //     .pipe(tap(resData => {
    //         this.handleAuthentication(
    //             resData.email,
    //             resData.localId,
    //             resData.idToken,
    //             +resData.expiresIn
    //             )
            
        
    //     }),catchError(this.handleError))

    // }


    // login(email: string, password: string){
    //     return this.http.post<AuthRespData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`, 
    //     {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //       }
    //     )
    //     .pipe(
    //       catchError(this.handleError),
    //       tap(resData => {
    //         this.handleAuthentication(
    //           resData.email,
    //           resData.localId,
    //           resData.idToken,
    //           +resData.expiresIn
    //         );
    //       })
    //     );
    // }

    // autoLogin() {
    //     const userDate : {
    //         email: string,
    //         id: string,
    //         _token: string,
    //         _tokenExpirationDate: string
    //     } = JSON.parse(localStorage.getItem('userDate'))
    //     console.log(userDate)
    //     if (!userDate) { 
    //         return;
    //     }

    //     const loadedUser = new User(userDate.email, userDate.id, userDate._token, new Date(userDate._tokenExpirationDate))
        
    //     console.log(loadedUser)

    //     if (loadedUser.token) {
    //         // this.user.next(loadedUser)
    //         this.store.dispatch(new AuthActions.AuthenticationSuccess(
    //           {
    //             email: loadedUser.email,
    //             userId: loadedUser.id,
    //             token: loadedUser.token,
    //             expirationDate:new Date(userDate._tokenExpirationDate)
    //           }));

    //         const expirationDuration = new Date(userDate._tokenExpirationDate).getTime()  - new Date().getTime()
    //         this.autoLogout(expirationDuration)
    //     }
    // }

    // logout() {
    //     // this.user.next(null)


    //     if(this.tokenExpirationTimer) {
    //         clearTimeout(this.tokenExpirationTimer)
    //     }
    //     this.tokenExpirationTimer = null
    // }


    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(()=>{
            this.store.dispatch(new AuthActions.Logout())
        }, expirationDuration)
    }


    clearLogoutTimer(){
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null
      }
    }
  
    // private handleAuthentication(
    //   email: string,
    //   userId: string,
    //   token: string,
    //   expiresIn: number
    // ) {
    //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //   this.store.dispatch(new AuthActions.AuthenticationSuccess(
    //     {
    //       email:email,
    //       userId: userId,
    //       token:token,
    //       expirationDate: expirationDate
    //     }));

    //   this.autoLogout(expiresIn * 10)
    // }
  
    // private handleError(errorRes: HttpErrorResponse) {
    //   let errorMessage = 'An unknown error occurred!';
    //   if (!errorRes.error || !errorRes.error.error) {
    //     return throwError(errorMessage);
    //   }
    //   switch (errorRes.error.error.message) {
    //     case 'EMAIL_EXISTS':
    //       errorMessage = 'This email exists already';
    //       break;
    //     case 'EMAIL_NOT_FOUND':
    //       errorMessage = 'This email does not exist.';
    //       break;
    //     case 'INVALID_PASSWORD':
    //       errorMessage = 'This password is not correct.';
    //       break;
    //   }
    //   return throwError(errorMessage);
    // }

    
}