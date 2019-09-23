import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../services/proxy.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  characters: any;
  favCharacters: [];
  loading: boolean = false;
  
  constructor(
    private proxyService: ProxyService,
    private sessionService: SessionService
  ) { }

  
  ngOnInit(){
    this.loading = true;
    this.proxyService.httpGet('https://swapi.co/api/people/').subscribe(
      (response: any) => {
        console.log(response.body.results);
        this.characters = response.body.results;

        const favorites = this.sessionService.getFavCharacter();
        if(this.characters && favorites) {
          this.characters.forEach(character => {
            favorites.forEach(favorite => {
              if(favorite.name === character.name) {
                character.isFavorite = true;
              }
            });
          });
        }
        this.loading = false;
    });

  }

  addFavorite(name: string) {
    console.log(name);
  }


  favCharacter(character: any) {
    if(!character.isFavorite) {
       this.sessionService.setFavCharacter(character);
    } else {
      this.sessionService.removeFavCharacter(character);
    }
    character.isFavorite = !character.isFavorite; 
    
    console.log(`Favorite character ${character}`);
  }

  compareCharacter(character: any) {
    character.compare = !character.compare; 

    console.log(`Favorite character ${character.name}`);
  }

  

}
