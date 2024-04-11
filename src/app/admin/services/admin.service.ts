//here make some url, inject some services.. then create some services..
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public user_url = "http://localhost:3000/user/"; // using a '/' because need to contaminate with userId... 
  public Product_url = "http://localhost:3000/products/";
  public all_user = "http://localhost:3000/orders";

  constructor( private apiService : ApiService) { }

  userDashboardData()
  {
    return this.apiService.get(this.user_url);
  }

  productDashboardData()
  {
    return this.apiService.get(this.Product_url);
  }

  //when we need to return multiple type of data after observe..need to use observable...
  allUser():Observable<any>
  {
    return this.apiService.get(this.all_user);
  }

  addUser(user_dto:any)
  {
    return this.apiService.post(this.user_url, user_dto);
  }

  //get data of single user
  singleUser(userId : any)
  {
    return this.apiService.get(this.user_url,userId);
  }

  //update data of indivisual user
  editUser(userId : any,user_dto : any): Observable<any>
  {
    return this.apiService.put(this.user_url+userId, user_dto);
  }
  deleteUser(userId : any)
  {
    return this.apiService.delete(this.user_url+userId);
  }
}
