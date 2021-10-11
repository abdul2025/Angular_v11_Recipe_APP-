import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCompnent } from './auth/auth.component';

const appRouters: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'auth', component: AuthCompnent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRouters)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}