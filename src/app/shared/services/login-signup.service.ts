import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  // run this command--> json-server --watch db.json

  public login_url = "http://localhost:3000";
  public reg_url = "http://localhost:3000"

  // here we do -->1. auth login, 2. user Registration, 3. Admin login
  constructor(private http:HttpClient , private apiService : ApiService) { }

  authLogin(user_name : any,passward : any):Observable<any>{
    return this.apiService.get(this.login_url +'/user?email=' + user_name + '&password=' +passward );
  }
  userRegister(user_dto : any):Observable<any>{
    return this.apiService.post(this.reg_url + '/user',user_dto );
  }
  adminLogin(user_name : any,passward : any):Observable<any>{
    return this.apiService.get(this.login_url +'/user?email=' + user_name + '&password=' +passward +'&role=admin' );
  }

}
