import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user_url = "http://localhost:3000/user/";
  constructor(private http:HttpClient, private apiService:ApiService) { }

  //get individual data
  getUserData(user_id : any){
    return this.apiService.get(this.user_url+user_id);
  }

  //update data by user id,
  // to get data observable is not needed, but when we put it.. it is needed..

  updateUserData(user_id:any, user_dto:any):Observable<any>{
    return this.apiService.put(this.user_url+user_id , user_dto);
  }
}
