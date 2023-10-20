import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import Swal from 'sweetalert2';
import { ModalService } from './modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'contact-2';
  searchQuery: string = '';
  searchResults: any;
  @Input() sideNavStatus : boolean = false;
  isSave:boolean = true;
  table = false;
  values=[]

  updateProcess(){
    this.isSave = false;
  }

  createcontactsavepopup(){
    Swal.fire("Thank you...",'Your contact has been Updated Successfully','success')
  }
  
  constructor(  private fb: FormBuilder, 
    private service: ApiserviceService,
    private http:HttpClient,
    private modal:ModalService){ }

   

    displayedColumns: string[] = ['name', 'phonenumber', 'email', 'getdetails'];
    dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([]);


  openModal(id:any){
    this.modal.openModal(id);

  }

    onInputChange() {
      if(this.searchQuery!=''){
      this.http.get<any>(`http://localhost:4000/search?name=${this.searchQuery}`).subscribe((res)=>{
        this.searchResults = res.result,
        this.dataSource = this.searchResults;
        this.table = true;
      });
    }
    else{
      this.table = false;
    }
    }
  
}
export interface PeriodicElement {
  contact_name: string;
  contact_phone: number;
  contact_email: string;
}