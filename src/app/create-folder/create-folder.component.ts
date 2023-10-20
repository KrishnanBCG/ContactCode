import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement{
  name:string;
  
}

const ELEMENT_DATA: PeriodicElement[] = 
[
  { name: 'krishnan'},
  { name: 'krishnan'},
  { name: 'krishnan'},
  { name: 'krishnan'},

];


@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent {

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
 

  ngAfterViewInit() {
    this.dataSource =new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator=this.paginator
  }

}

