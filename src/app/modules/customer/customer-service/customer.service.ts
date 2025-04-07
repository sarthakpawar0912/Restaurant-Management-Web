import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../../auth-services/storage-service/user-storage.service';
import { Observable } from 'rxjs';


const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  constructor(private http: HttpClient,
    private userStorage:UserStorageService
  ){}

   getAllcategories(): Observable<any> {
      return this.http.get(BASIC_URL + 'api/customer/categories', {
        headers: this.createAuthorizationHeader(),
      });
    }

    getAllcategoriesByName(title:string): Observable<any> {
      return this.http.get(BASIC_URL + 'api/customer/categories/${title}', {
        headers: this.createAuthorizationHeader(),
      });
    }


    //product operations
    getProductByCategory(categoryId: number): Observable<any> {
      return this.http.get(`${BASIC_URL}api/customer/${categoryId}/products`, {
        headers: this.createAuthorizationHeader(),
      });
    }




    getProductsByCategoryAndTitle(categoryId: number, title: string): Observable<any> {
      return this.http.get(`${BASIC_URL}api/customer/${categoryId}/products/${title}`, {
        headers: this.createAuthorizationHeader(),
      });
    }
    


    //Reservation operations


    
    postReservation(reservationDTO:any): Observable<any> {
      reservationDTO.customerId=this.userStorage.getUserId();
      return this.http.post(`${BASIC_URL}api/customer/reservation`,reservationDTO, {
        headers: this.createAuthorizationHeader(),
      });
    }

   // ✅ Fetch all reservations for logged-in user
   getReservationsByUser(): Observable<any> {
    const userId = this.userStorage.getUserId();
    return this.http.get(`${BASIC_URL}api/customer/reservations/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }






  createAuthorizationHeader(){

    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + this.userStorage.getToken());
  }
}
