import { Component, Input, ViewChild,OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'contact-2';
  searchQuery: string = '';
  searchResults: any;
  @Input() sideNavStatus: boolean = false;
  table = false;
  values = []
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Tags: string[] = [];
  foldername: any;
  rtag: any;
  allcontact: any;
  isModalOpen = true;
  getparamid: any;
  singlecontact: any;
  tags: string[] = [];
  id: any;
  slideToggleValue: boolean = true;
  Relation = [];
  RelationTags = [];
  relationContact:any;
  displayedColumns: string[] = ['name', 'phonenumber', 'email', 'getdetails'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([]);
  checked:any;
  active:string = '';



activeStatus(){
  if(this.active == 'N'){
this.checked = false
  }
}

  // =========== Constructor =============================
  constructor(private fb: FormBuilder,
    private api: ApiserviceService,
    private http: HttpClient) {

  }
  // =========== OnInit ============================

  ngOnInit(): void {
    this.folderName();
    this.relationtagName();
  }
  // ========================================

  createcontactsavepopup() {
    Swal.fire("Thank you...", 'Your contact has been Updated Successfully', 'success')
  }

  // ========= form group ======================
  folderValue = new FormControl();
  rtagValue = new FormControl();
  tagValue = new FormControl();

  userform = new FormGroup({
    'name': new FormControl(''),
    'phone': new FormControl(''),
    'phone1': new FormControl(''),
    'email': new FormControl(''),
    'email1': new FormControl(''),
    'address': new FormControl(''),
    'address1': new FormControl(''),
    'status': new FormControl(''),
    'tags': new FormControl<string[]>([]),
    'folderValue': new FormControl(''),
    'rtagValue': new FormControl(''),
    'relname': new FormControl(''),
    'relcontact':new FormControl(''),
    'reldummy': new FormControl('')
  })

  @ViewChild('testing') testElement! :ElementRef;
  @ViewChild('relcontactInput') relcontactInput!: ElementRef;

// ========================= User Update ============================================================================

  userupdate() {
    let a = this.testElement.nativeElement.value;
    this.userform.get('relname')?.setValue(a);
 
    const inputElement = document.getElementById('test') as HTMLInputElement;
    const selectedValue = inputElement.value;
    const selectedOption = document.querySelector(`datalist#relation option[value="${selectedValue}"]`);
    if (selectedOption) {
      const rel_id = selectedOption.getAttribute('data-contactId');
      if (rel_id) {
        this.userform.get('relcontact')?.setValue(rel_id);
      }
    }
    const aa = this.userform.get('status')?.value
    if (aa) {
      this.active = 'Y'; 
      this.userform.get('status')?.setValue(this.active);
    } else {
      this.checked = false;
      this.active = 'N'
      this.userform.get('status')?.setValue(this.active);
    } 

    if (this.userform.valid) {
      this.api.updateContact(this.userform.value, this.id).subscribe((res)=>{
        console.log(res, "Contact Updated Successfully");
      })
      console.log(this.userform.value);
    }
    else{
      console.log("Error while updating the contact");
    }
  }
 
// ================================================================================================================================

  getId(contact_Id: any) {
    this.getsingledata(contact_Id);
  }

  //   ======== Main Search ========

  onInputChange() {
    if (this.searchQuery != '') {
      this.http.get<any>(`http://localhost:4000/search?name=${this.searchQuery}`).subscribe((res) => {
        this.searchResults = res.result,
          this.dataSource = this.searchResults;
        this.table = true;
      });
    }
    else {
      this.table = false;
    }
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
relationContactname(){
  this.api.relcontact().subscribe((res)=>{
    this.relationContact = res.data
  })
}


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

    if (index >= 0) {
      this.Tags.splice(index, 1);
    }
  }

  getsingledata(contact_Id: any) {
    this.api.getSingleCotact(contact_Id).subscribe((res) => {
      this.singlecontact = res.data
      this.tags = res.tags
      this.folderValue.patchValue(res.data[0].folder);
      this.rtagValue.patchValue(res.data[0].reltag);
      this.id = contact_Id;
      if (this.id == contact_Id) {
        this.Tags = [];
        for (let tag of this.tags) {
          if (tag != null) {
            this.Tags.push(tag);
          }
        }
      }
      if(res.data[0].contact_status == "N"){
        this.checked = false;
        this.active = "N"
        this.userform.get('status')?.patchValue(this.active);
      }
      else{
        this.checked = true;
        this.active = "Y"
        this.userform.get('status')?.patchValue(this.active);
      }

      this.userform.get('tags')?.patchValue(this.Tags);
      this.userform.patchValue({
        'name': res.data[0].contact_name,
        'phone': res.data[0].contact_phone,
        'phone1': res.data[0].contact_phone1,
        'email': res.data[0].contact_email,
        'email1': res.data[0].contact_email1,
        'address': res.data[0].contact_address,
        'address1': res.data[0].contact_address1,
        'folderValue': res.data[0].folder,
        'rtagValue': res.data[0].reltag,
        'reldummy': res.data[0].relcontactno
      })
      console.log(this.userform.value)
    })
this.relationContactname();

  }



 
}

export interface PeriodicElement {
  contact_name: string;
  contact_phone: number;
  contact_email: string;
}

