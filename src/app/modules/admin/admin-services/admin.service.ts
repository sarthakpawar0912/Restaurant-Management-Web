import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../../auth-services/storage-service/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
    private userStorage:UserStorageService
  ){}

  postCategory(categoryDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllcategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllcategoriesByTitle(title: string): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/categories/search?title=${title}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  //product operations
 // ✅ Corrected API call (Fixed interpolation issue)
  // ✅ Corrected API call (Fixed URL interpolation issue)
  postProduct(categoryId: number, productDTO: FormData): Observable<any> {
    const headers = this.createAuthorizationHeader();
    console.log('Authorization Header:', headers.get('Authorization')); // Debugging

    // Corrected the URL to match the backend endpoint
    return this.http.post(`${BASIC_URL}api/admin/${categoryId}/product`, productDTO, {
      headers: headers,
    });
  }

  
  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/${categoryId}/products`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductsByCategoryAndTitle(categoryId:number,title: string): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/${categoryId}/product/${title}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
      observe: 'response' // Ensures full HTTP response
    });
  }
 
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateProduct(productId: number, productDTO: FormData): Observable<any> {
    const headers = this.createAuthorizationHeader();
    console.log('Authorization Header:', headers.get('Authorization')); // Debugging

    // Corrected the URL to match the backend endpoint
    return this.http.put(`${BASIC_URL}api/admin/product/${productId}`, productDTO, {
      headers: headers,
    });
  }

  getReservations(): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/reservations`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  changeReservationStatus(reservationId:number,status:string): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/reservation/${reservationId}/${status}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
   
  createAuthorizationHeader(){

    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + this.userStorage.getToken());
  }
  
}
