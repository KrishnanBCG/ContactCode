import { Injectable } from '@angular/core';
import { Overlay } from 'primeng/overlay';
import { MatDialog } from '@angular/material/dialog';
import { CreateContactComponent } from './create-contact/create-contact.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor( private dialog : MatDialog ) {}

    openModal(id: string) {
      this.dialog.open(CreateContactComponent, {
        data: { id },
      });
    }

}
