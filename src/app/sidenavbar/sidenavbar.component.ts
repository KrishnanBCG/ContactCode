import { Component,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter<boolean>()
  menu :boolean =false;
  notSave:boolean = true;

  saveProcess(){
    this.notSave = false;
  }

SideNavToggled(){
  this.menu = !this.menu
  this.sideNavToggled.emit(this.menu);
}


  
ngOnInit(): void { }

//phonenumber dynamicinput

Phonenumber:FormGroup;

constructor(private fb:FormBuilder){
  this.Phonenumber=this.fb.group({
    Phonenumber : this.fb.array([])
  })
}

get phonenumber(){
  return this.Phonenumber.get('Phonenumber') as FormArray;
}

addNewInput(){
  this.phonenumber.push(this.fb.control(''))
}
removeInput(index: number) {
  this.phonenumber.removeAt(index);
}


}
