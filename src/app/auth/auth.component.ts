import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService, AuthRespData } from "./auth.service";

import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html', 
    styleUrls: ['./auth.component.css']
})


export class AuthCompnent implements OnInit {
    
    authForm: FormGroup
    
    
    isLoginMode = true;

    isLoading = false;

    error: string;


    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}


    ngOnInit(): void {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading,
            this.error = authState.authError

        })
        this.initForm()
    }


    initForm(){
        this.authForm = new FormGroup({
            'email': new FormControl(null, Validators.required), 
            'passowrd': new FormControl(null, Validators.required)
        })
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
        this.error = '';
    }






    onSubmit() {

        let authObs: Observable<AuthRespData>
        const email = this.authForm.value.email;
        const passowrd = this.authForm.value.passowrd;
        
        
        
        if (!this.authForm.valid) {
            return
        }
         
        if (this.isLoginMode){
            // authObs = this.authService.login(email, passowrd)
            this.store.dispatch(new AuthActions.LogingStart({email: email, password: passowrd}))
        }else {
            authObs = this.authService.singUp(email, passowrd)
        }
        // this.store.select('auth').subscribe(authState => {

        // })
        // this.isLoading = true;

        // authObs.subscribe(resAuthData => {
        //     console.log(resAuthData);
        //     this.router.navigate(['/recipes'])
        //     this.isLoading = false
        // }, errorMessage => {
        //     console.log(errorMessage)
        //     this.error = errorMessage
        //     this.isLoading = false
        // })
        
        this.authForm.reset()
    }


    handleError() {
        this.error = null
    }
}