import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "./auth.service";

import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html', 
    styleUrls: ['./auth.component.css']
})


export class AuthCompnent implements OnInit, OnDestroy {
    
    authForm: FormGroup
    
    
    isLoginMode = true;

    isLoading = false;

    error: string;

    private storeSub: Subscription;


    constructor(private store: Store<fromApp.AppState>) {}


    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading,
            this.error = authState.authError
            console.log(this.error)
            // if (this.error) {
            //     this.handleError()
            // }

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

        const email = this.authForm.value.email;
        const passowrd = this.authForm.value.passowrd;
        
        
        
        if (!this.authForm.valid) {
            return
        }
         
        if (this.isLoginMode){
            this.store.dispatch(new AuthActions.LogingStart({email: email, password: passowrd}))
        }else {
            this.store.dispatch(new AuthActions.Signup({email: email, password: passowrd}))
        }
        this.authForm.reset()
    }


    handleError() {
        this.store.dispatch(new AuthActions.ClearError());

    }

    ngOnDestroy() {
        if(this.storeSub){
            this.storeSub.unsubscribe()
        }
    }
}