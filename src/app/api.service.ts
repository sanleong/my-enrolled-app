import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Element } from './element-interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getEnrolles(){
    return this.httpClient.get(`http://localhost:8080/enrollees`);
  }

  public getEnrolled(id: string) {
    return this.httpClient.get(`http://localhost:8080/enrollees/${id}`)
  }

  /** PUT: update the enrolled on the server */
  public putEnrolled (enrolled: Element) {
    const enrollUdt = {name: enrolled.name, active:enrolled.active, dateOfBirth: enrolled.dateOfBirth}
    const url = `${environment.apiServer}:${environment.port}/enrollees/${enrolled.id}`
    this.httpClient.put<Element>(url, enrollUdt)
      .subscribe(data =>  console.log(data.id));
  }

}
