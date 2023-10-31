import { Component,EventEmitter,OnInit, Output} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';




@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

@Output() sideNavToggled = new EventEmitter<boolean>()
menu :boolean =false;
foldername:any;
rtag:any;

  constructor(private api:ApiserviceService) {
  }

  ngOnInit(): void {
    this.folderName();
    this.relationtagName();
   }


SideNavToggled(){
  this.menu = !this.menu
  this.sideNavToggled.emit(this.menu);
}

folderName(){
  this.api.folder().subscribe((res) => {
    this.foldername = res.data
  });
}
relationtagName(){
  this.api.rtags().subscribe((res) => {
    this.rtag = res.data
  })
}
}
