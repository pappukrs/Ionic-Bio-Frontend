import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }


  getAllList() {
    return this.http.get(`http://localhost:8080/api/v1/form/`);
  }
  getSingleList(id: any) {
    return this.http.get(`http://localhost:8080/api/v1/form/${id}`);
  }
  createSingleList(data: any) {
    return this.http.post(`http://localhost:8080/api/v1/form/`, data);
  }
  updateSingleList(id: any, data: any) {
    return this.http.put(`http://localhost:8080/api/v1/form/${id}`, data);
  }
  deleteSingleList(id: any) {
    return this.http.delete(`http://localhost:8080/api/v1/form/${id}`);
  }
  mqttPublish(data: any) {
    return this.http.post(
      `http://localhost:8080/api/v1/form/mqtt-publish`,
      data
    );
  }
}
