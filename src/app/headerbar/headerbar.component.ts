import { Component , EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent implements OnInit{

  @Output() sideNavToggled = new EventEmitter<boolean>()
  menu :boolean =false;


  NavToggled(){
    this.menu = !this.menu
    this.sideNavToggled.emit(this.menu);
  }

constructor(){}

  ngOnInit(): void {  }


}
