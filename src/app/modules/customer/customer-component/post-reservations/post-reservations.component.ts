import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../customer-service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-reservations',
  standalone: false,
  templateUrl: './post-reservations.component.html',
  styleUrl: './post-reservations.component.scss'
})
export class PostReservationsComponent {

  isSpinning: boolean = false;
  validateForm!:FormGroup;

  TableType: string[] = [
    "Standard Table",
    "Booth",
    "Communal Table",
    "Bar Table",
    "Outdoor Table",
    "High-top Table",
    "Banquette",
    "Chef's Table" ,
    "Convertible Table",
    "Corner Table",
    "Family-Style Table",
    "Window-side Table",
    "Private Dining Table",
    "Lounge Table",
    "Round Table",
    "Custom Table"
  ];

  constructor(private fb:FormBuilder,
    private service:CustomerService,
    private message:NzMessageService,  private router: Router
  ){}

  ngOnInit(){
    this.validateForm=this.fb.group({
      tableType:[null,Validators.required],
      dateTime:[null,Validators.required],
      description:[null,Validators.required],
    })
  }


  postReservation() {
    if (this.validateForm.invalid) {
      this.message.warning("Please fill all required fields");
      return;
    }

    this.isSpinning = true; // Start loading spinner
    this.service.postReservation(this.validateForm.value).subscribe(
      (res) => {
        this.isSpinning = false; // Stop spinner
        console.log(res);
        
        if (res.id != null) {
          this.message.success("Reservation posted successfully", { nzDuration: 3000 });
          
          // ✅ Redirect to "Get All Reservations" page after success
          setTimeout(() => {
            this.router.navigate(['/customer/reservations']);
          }, 2000);
          
        } else {
          this.message.error("Something went wrong", { nzDuration: 5000 });
        }
      },
      (error) => {
        this.isSpinning = false; // Stop spinner on error
        console.error("Error posting reservation:", error);
        this.message.error("Failed to post reservation", { nzDuration: 5000 });
      }
    );
  }
}