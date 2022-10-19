import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { DogsBreedsService } from 'src/app/services/dogs-breeds.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})

export class FinderComponent implements OnInit {
  filteredOptions: Observable<string[]> | undefined;
  breedsAndSubBreeds: string[] = [];
  breedToFind: string ='';
  myControl = new FormControl('');
  @Output() outputListArray = new EventEmitter<string[]>();
  
  constructor( private dogsBreedsService:DogsBreedsService ) { }

  ngOnInit(): void {
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
    let breed, subBreed = ''
    if (this.breedToFind.includes("-")){
      let temp = this.breedToFind.split('-')
      breed = temp[0]
      subBreed = temp[1]
      this.dogsBreedsService.getImages(breed,subBreed).subscribe((resp:any) =>{
        this.outputListArray.emit(resp.message);
      })
    }
    else{
      this.dogsBreedsService.getImages(this.breedToFind, null).subscribe((resp:any) =>{
        this.outputListArray.emit(resp.message);
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
