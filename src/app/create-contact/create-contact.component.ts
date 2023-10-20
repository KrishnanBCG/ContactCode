import { Component ,Input,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../apiservice.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {
  values=[]
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Tags: string[] = [];
  foldername:any;
  allcontact:any;
  @Input() saveshowSave : boolean = true;
  @Input() detailsshowSave : boolean = true;


userform= new FormGroup ({
  'name' : new FormControl(''),
  'phone' : new FormControl(''),
  'phone1' : new FormControl(''),
  'email' : new FormControl(''),
  'email1' : new FormControl(''),
  'address' : new FormControl(''),
  'address1' : new FormControl(''),
  'status': new FormControl(''),
  'folder' : new FormControl(''),
  'tags' : new FormControl('')
})

usersubmit(){
  if(this.userform.valid){
    this.api.createContact(this.userform.value).subscribe((res)=>{
      this.userform.reset();
    })
  }
}

constructor(private http:HttpClient,
  private api:ApiserviceService,
  private modal:ModalService){}

//--------------------------------------- success popup ---------------------------------------


createcontactsavepopup(){
  Swal.fire("Thank you...",'Your contact has been submittend Successfully','success');
}


// --------------------------------------------------------------------------------------------
openModal(id:any){
this.modal.openModal(id);
}

ngOnInit(): void {
  this.api.folder().subscribe((res)=>{
    this.foldername = res.data
});
this.getAllContact();
}


//------------------------------POPUP Process---------------------------------------
  public items =[

  ]
// ---------------------------------------------------------------------------

add(event: MatChipInputEvent): void {
  const input = event.chipInput.inputElement;
  const value = (event.value || '').trim();
  if (value) {
    this.Tags.push(value);
  }
  if (input) {
    input.value = '';
  }
}
remove(tag: string): void {
  const index = this.Tags.indexOf(tag);

  if (index >= 0) 
  {
    this.Tags.splice(index, 1);
  }
}


getAllContact(){
  this.api.getAllContact().subscribe((res)=>{
    this.allcontact = res.data
  });
}

}