import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    Headers: new HttpHeaders({
      "Content-Type" :"application/json",
      "Access-Control-Allow-Origin" : "*"
    })
  }

  constructor(private http:HttpClient) {}
    private formatErrors(error:any){
      return throwError(error.error)
    }
    
   
}
