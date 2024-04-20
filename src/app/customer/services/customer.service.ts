import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  //an observable sequence that ides the source sequence...
private Single_product_id = new BehaviorSubject(null);
current_product= this.Single_product_id.asObservable();
  public user_url = 'http://localhost:3000/user/';
  public product_url = 'http://localhost:3000/products/';
  public order_url = 'http://localhost:3000/orders/';
  constructor(private apiService: ApiService) {}

  //here we are creating metoods for all purposes... and observe the data...

  allProduct():Observable<any>{
    return this.apiService.get(this.product_url);
  }
  quickBuyProduct(product_id:any){
    this.Single_product_id.next(product_id);
  }
  individualProduct(id:any){
    return this.apiService.get(this.product_url+id);
  }
  userDetail(id:any){
    return this.apiService.get(this.user_url+id);
  }
  insertNewOrder(order_dto:any):Observable<any>{
    return this.apiService.post(this.order_url,order_dto);
  }
  orderDashBoardData():Observable<any>{
    return this.apiService.get(this.order_url);
  }
  productDashBoardData():Observable<any>{
    return this.apiService.get(this.product_url);
  }
}
