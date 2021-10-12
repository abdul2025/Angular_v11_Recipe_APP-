import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthCompnent } from "./auth.component";




@NgModule({
    declarations: [
        AuthCompnent, 
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', component: AuthCompnent}
        ]),
        SharedModule
    ]
})

export class AuthModule {}