import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }


    apiUrl = 'http://localhost:4000';

  
    getAllData():Observable<any>
    {
      return this.http.get(`${this.apiUrl}/search`);
    }
    
    createContact(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/createcontact`,data);
    }

    folder():Observable<any>{
      return this.http.get(`${this.apiUrl}/folder`);
    }
    type():Observable<any>{
      return this.http.get(`${this.apiUrl}/type`);
    }

    createtag(data:any):Observable<any>{
      return this.http.post(`${this.apiUrl}/createtag`,data);
    }

    tags():Observable<any>{
      return this.http.get(`${this.apiUrl}/tags`);
    }

    updateContact(data:any, id:any):Observable<any>{
      return this.http.put(`${this.apiUrl}/updatecontact/${id}`, data);
    }

    getAllContact():Observable<any>{
     return this.http.get(`${this.apiUrl}/allcontact`);
    }
}
