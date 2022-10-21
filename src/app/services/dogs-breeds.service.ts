import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class DogsBreedsService {

  // service_url = 'https://dog.ceo'
  
  constructor( private http: HttpClient){
    console.log('*** Dog Breeds Service Running ***')
  }

  getDogBreeds(): Observable<any> {
    return this.http.get<any>(`${environment.service_url}/api/breeds/list/all`)
  }

  getImages(breed: any,subBreed: any): Observable<any> {
    return subBreed ? this.http.get<any>(
      `${environment.service_url}/api/breed/${breed}/${subBreed}/images/random/4`) :
       this.http.get<any>(`${environment.service_url}/api/breed/${breed}/images/random/4`)
  }

  getDogBreeds_by_name(name: string): Observable<any> {
    return this.http.get<any>(`${environment.service_url}/api/breeds/list/all`)
  }
  
}
