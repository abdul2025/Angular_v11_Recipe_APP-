import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorgeService: DataStorageService) { }

  ngOnInit(): void {
  
  }

  onSaveData() {
    this.dataStorgeService.storeRecipe()
  }


  onFetchData(){
    this.dataStorgeService.fetchData();
  }

}
