import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html', 
    styleUrls: ['./auth.component.css']
})


export class AuthCompnent implements OnInit {
    
    authForm: FormGroup
    
    
    isLoginMode = true;

    isLoading = false;


    constructor(private authService: AuthService) {}


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
    }


    onSubmit() {
        if (!this.authForm.valid) {
            return
        }
        this.isLoading = true;

        if (this.isLoginMode) {
            //// ..
        } else {
            const email = this.authForm.value.email;
            const passowrd = this.authForm.value.passowrd;
            this.authService.singUp(email, passowrd).subscribe(resAuthData => {
                console.log(resAuthData);
                this.isLoading = false
            }, error => {
                console.log(error)
            })
        }
        

        this.authForm.reset()
    }
}