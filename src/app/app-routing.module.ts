import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, PreloadingStrategy } from '@angular/router';

const appRouters: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', 
    loadChildren: ()=> import('./recipes/recipes.module').then(module => module.RecipesModule) 
  },
  {path: 'shopping-list',
   loadChildren: ()=> import('./shopping-list/shopping.module').then(module => module.ShoppingModule)
  },
  {path: 'auth',
   loadChildren: ()=> import('./auth/auth.module').then(module => module.AuthModule)
  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRouters, { preloadingStrategy: PreloadAllModules }) ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}