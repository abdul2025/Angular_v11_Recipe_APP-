import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.comonent";



@NgModule({
    declarations: [
        DropdownDirective, 
        LoadingSpinnerComponent,
        AlertComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        DropdownDirective, 
        LoadingSpinnerComponent,
        AlertComponent
    ],
})

export class SharedModule {}