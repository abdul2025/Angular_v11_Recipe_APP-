import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer'
import * as AuthActions from './auth/store/auth.actions'
import * as RecipeActions from '../app/recipes/store/recipe.actions'
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  authSub: Subscription

  constructor(private store: Store<fromApp.AppState>){}


  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin())
    this.authSub = this.store.select('auth').pipe(map((authdata)=>{
      return authdata.user
    })).subscribe(user => {
      if (user){
        this.store.dispatch(new RecipeActions.FetchRecipes())
      }
    })
  }

  ngOnDestroy () {
    this.authSub.unsubscribe()
  }

}
