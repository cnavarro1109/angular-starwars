import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../services/proxy.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  characters: any
  
  constructor(
    private proxyService: ProxyService
  ) { }

  
  ngOnInit(){
    this.proxyService.httpGet('https://swapi.co/api/people/').subscribe(
      (response: any) => {
        console.log(response.body.results);
        this.characters = response.body.results;
    });
  }

  addFavorite(name: string) {
    console.log(name);
  }

  // isFavorite: boolean = false;
  favCharacter(character: any) {
    character.isFavorite = !character.isFavorite; 
    
    console.log(`Favorite character ${character}`);
  }

  compareCharacter(character: any) {
    character.compare = !character.compare; 

    console.log(`Favorite character ${character.name}`);
  }

  

}
