import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthRespData } from "./auth.service";

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


    constructor(private authService: AuthService, private router: Router) {}


    ngOnInit(): void {
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
            authObs = this.authService.login(email, passowrd)
        }else {
            authObs = this.authService.singUp(email, passowrd)
        }
        
        this.isLoading = true;

        authObs.subscribe(resAuthData => {
            console.log(resAuthData);
            this.router.navigate(['/recipes'])
            this.isLoading = false
        }, errorMessage => {
            console.log(errorMessage)
            this.error = errorMessage
            this.isLoading = false
        })
        
        this.authForm.reset()
    }


    handleError() {
        this.error = null
    }
}