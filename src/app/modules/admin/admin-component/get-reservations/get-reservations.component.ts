import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-reservations',
  standalone: false,
  templateUrl: './get-reservations.component.html',
  styleUrl: './get-reservations.component.scss'
})
export class GetReservationsComponent {

 
  isSpinning: boolean = true;
  reservations: any[] = []; 

  constructor(private service: AdminService, private message: NzMessageService) {}

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.service.getReservations().subscribe(
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

  changeReservationStatus(reservationId: number, status: string) {
    console.log(reservationId, status);
    this.service.changeReservationStatus(reservationId, status).subscribe(
      (res) => {
        console.log(res);
        if (res.id != null) {
          this.getReservations();
          this.message.success(`Reservation status changed successfully`, { nzDuration: 5000 });
        } else {
          this.message.error(`Something went wrong`, { nzDuration: 5000 });
        }
      },
      (error) => {
        this.message.error(`Error: ${error.message}`, { nzDuration: 5000 });
      }
    );
  }

  getEmptyRows(dataLength: number): number[] {
    const emptyRowCount = 5 - dataLength;
    return emptyRowCount > 0 ? Array(emptyRowCount).fill(0) : [];
  }
}