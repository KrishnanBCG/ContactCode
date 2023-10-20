import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inactivecontact',
  templateUrl: './inactivecontact.component.html',
  styleUrls: ['./inactivecontact.component.css']
})
export class InactivecontactComponent {


  checked:any;

  inactive = new FormGroup({
    checkbox: new FormControl(false), // Initialize with 'false'
  });

  chekedpopup(){
    Swal.fire("Thank you...",'Your contact has been InActive','success')
  }

  notchekedpopup(){
    Swal.fire("Thank you...",'Your contact has Active ','success')
  }

  onsubmit() {
    if (this.inactive.value.checkbox) {
          this.checked = "Y"
     }
    else{
      this.checked = "N"
      console.log(this.checked);
      this.notchekedpopup();
    }
    
}

}
