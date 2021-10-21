import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipeActions from '../recipes/store/recipe.actions'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;

  isAuth = false

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
   this.userSub = this.store.select('auth').pipe(map(authState => {
     return authState.user
   })).subscribe(user =>  {
     console.log(user)
    // opposite and reverse the status of the user exists
     this.isAuth = !!user
   })
    
  }

  onSaveData() {
    // this.dataStorgeService.storeRecipe()
    this.store.dispatch(new RecipeActions.StoreRecipes())
  }

  onFetchData(){
    // this.dataStorgeService.fetchData().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes())
  }



  onLogout() {
    this.store.dispatch(new AuthActions.Logout())

  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
