import { Component } from '@angular/core';
import { DogsBreedsService } from './services/dogs-breeds.service';
import { FormControl } from '@angular/forms';
import { Observable} from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DogsBreedsService]

})

export class AppComponent {
  title = 'firstep';
  options = ["este","otro"]
  myControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;
  breedsAndSubBreeds: string[] = [];
  breedToFind: string ='';
  imagesURLs: string[] = [] 
  datoEmitido: string[] = [];
 
  constructor( private dogsBreedsService:DogsBreedsService ){}
  
  ngOnInit(){
    
  }

  listArray($event:any): any{
    this.imagesURLs = $event
    console.log("Event log: ", $event)
  }

}
