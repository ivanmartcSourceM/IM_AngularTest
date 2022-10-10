import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class DogsBreedsService {

  service_url = 'https://dog.ceo/api/breeds/list/all'
  
  constructor( private http: HttpClient){
    console.log('*** Dog Breeds Service Running ***')
  }

  getDogBreeds(): Observable<any> {
    // let headers = new HttpHeaders().set('Type-content', 'aplication/json')
    // return this.http.get(this.service_url,{ headers: headers })
    return this.http.get<any>('/api/breeds/list/all')

  }

  getImages(breed: any,subBreed: any): Observable<any> {
    // let headers = new HttpHeaders().set('Type-content', 'aplication/json')
    // return this.http.get(this.service_url,{ headers: headers })
    return subBreed ? this.http.get<any>(`/api/breed/${breed}/${subBreed}/images/random/5`) : this.http.get<any>(`/api/breed/${breed}/images/random/5`)
  }

  getDogBreeds_by_name(name: string): Observable<any> {
    // let headers = new HttpHeaders().set('Type-content', 'aplication/json')
    // return this.http.get(this.service_url,{ headers: headers })
    return this.http.get<any>('/api/breeds/list/all')

  }
  
}
