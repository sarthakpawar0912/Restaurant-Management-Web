import { Component } from '@angular/core';
import { CustomerService } from '../../customer-service/customer.service';

@Component({
  selector: 'app-get-all-reservations',
  standalone: false,
  templateUrl: './get-all-reservations.component.html',
  styleUrl: './get-all-reservations.component.scss'
})
export class GetAllReservationsComponent {
  
  isSpinning: boolean = true;
  reservations: any[] = [];

  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.getReservationsByUser();
  }

  getReservationsByUser() {
    this.service.getReservationsByUser().subscribe(
      (res) => {
        console.log(res);
        this.reservations = res;
        this.isSpinning = false;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        this.isSpinning = false;
      }
    );
  }

  getEmptyRows(dataLength: number): number[] {
    const emptyRowCount = Math.max(0, 10 - dataLength); // Ensure at least 10 rows are displayed
    return Array(emptyRowCount).fill(0); // Create an array of empty rows
  }

}