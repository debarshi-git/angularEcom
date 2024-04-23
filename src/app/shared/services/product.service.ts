import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
public Product_Url = "http://localhost:3000/products/"
  constructor(private httpClient:HttpClient, private apiService:ApiService) { }

  allProduct():Observable<any>{
    return this.apiService.get(this.Product_Url);
  }

  addNewProduct(Product_dto:any):Observable<any>{
    return this.apiService.post(this.Product_Url,Product_dto);
  }

  //as it is a single product.. so no need to observe..
  singleProduct(id:any){
    return this.apiService.get(this.Product_Url+id);
  }

  updateProduct(id:any,Product_dto:any):Observable<any>{
    return this.apiService.put(this.Product_Url+id,Product_dto);
  }

  deleteProduct(id:any):Observable<any>{
    return this.apiService.delete(this.Product_Url+id);
  }
}
