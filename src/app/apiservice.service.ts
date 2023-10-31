import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }


    apiUrl = 'http://localhost:4000';
  
  
    // -------------------------------------------------------------------------------------
  
    // ==== All contacts for main search =====
  
    getAllData():Observable<any>
    {
      return this.http.get(`${this.apiUrl}/search`);
    }
  
    // -------------------------------------------------------------------------------------
  
    // ==== create contact ====
    createContact(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/createcontact`,data);
    }

    // -------------------------------------------------------------------------------------
    

    
    type():Observable<any>{
      return this.http.get(`${this.apiUrl}/type`);
    }

    createtag(data:any):Observable<any>{
      return this.http.post(`${this.apiUrl}/createtag`,data);
    }


    // professional tags
    tags():Observable<any>{
      return this.http.get(`${this.apiUrl}/tags`);
    }

    folder():Observable<any>{
      return this.http.get(`${this.apiUrl}/folder`);
    }
    
    rtags():Observable<any>{
      return this.http.get(`${this.apiUrl}/rtag`);
    }

    updateContact(data:any, contact_Id:any):Observable<any>{
      return this.http.put(`${this.apiUrl}/updatecontact/${contact_Id}`, data);
    }

    getAllContact():Observable<any>{
     return this.http.get(`${this.apiUrl}/allcontact`);
    }

    getSingleCotact(contact_Id:any):Observable<any>{
      return this.http.get(`${this.apiUrl}/single/${contact_Id}`)
    }

    relcontact():Observable<any>{
      return this.http.get(`${this.apiUrl}/relcontact`)
    }


  }
