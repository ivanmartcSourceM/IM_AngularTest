import { Component } from '@angular/core';
import { DogsBreedsService } from './services/dogs-breeds.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { setAriaChecked } from 'ag-grid-community/dist/lib/utils/aria';


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
  
  findBreedImage = (event: any)=>{
    console.log("event",event.toElement.value)
  }

 
  constructor( private dogsBreedsService:DogsBreedsService ){}
  
  ngOnInit(){
    this.dogsBreedsService.getDogBreeds().subscribe((resp: any) => {
      console.log('data: ', typeof resp.message);
      
      //Create a Single list with Breeds and Sub Breeds 
      for (const key in resp.message) {
        if (resp.message.hasOwnProperty(key)) {
          this.breedsAndSubBreeds.push(key)
          let arr = Object.values(resp.message[key])
          arr.forEach((subBreed) => {
            this.breedsAndSubBreeds.push(`${key}-${subBreed}`)
          })
        }
      }
    }) 
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  search(){
    console.log("DEBUGGG",this.breedToFind)
    let breed, subBreed = ''
    if (this.breedToFind.includes("-")){
      let temp = this.breedToFind.split('-')
      breed = temp[0]
      subBreed = temp[1]
      this.dogsBreedsService.getImages(breed,subBreed).subscribe((resp:any) =>{
        this.imagesURLs = resp.message
        // console.log(resp)
        console.log("images: ", typeof this.imagesURLs)
      })
    }
    else{
      this.dogsBreedsService.getImages(this.breedToFind, null).subscribe((resp:any) =>{
        this.imagesURLs = resp.message
        console.log("images: ", typeof this.imagesURLs)
      })
    }
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return (this.breedsAndSubBreeds).filter(option => 
      option.toLowerCase().includes(filterValue)
    );
  }
}
