import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() displayedCom = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  OnClick(val: string){
    this.displayedCom.emit(val)
  }

}
