import { Component } from '@angular/core'

@Component({
    selector: 'firstComponent',
    templateUrl: './first.component.html'
})

export class FirstComponent {

    public name: string;
    public breed: string;
    public age_average: number;

    constructor(){
        this.name = 'Hannah BigMaMMa';
        this.breed = 'Bullterrier';
        this.age_average = 15;
        console.log("first component...  loaded");
        console.log(`Name: ${this.name}, Breed: ${this.breed}, Age Average: ${this.age_average}`);
    }
}