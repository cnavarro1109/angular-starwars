import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setFavCharacter(character: any) {
    var favorites = this.getFavCharacter();
    var result = [];

    // Adding the existing objects into the array
    if(favorites) {
      favorites.push(character);
      result = favorites;
    } else {
      result.push(character);
    }
    sessionStorage.setItem('Favorite', JSON.stringify(result));
  }

  removeFavCharacter(character: any) {
    var favorites = this.getFavCharacter();

    var count = 0;
    favorites.forEach(fav => {
      if(fav.name === character.name) {
        favorites.splice(count, 1);
      }
      count++;
    });
    sessionStorage.setItem('Favorite', JSON.stringify(favorites));

    // const index: number = favorites.indexOf(character);
    // if(index !== -1) {
    //   favorites.splice(index, 1);
    //   sessionStorage.setItem('Favorite', JSON.stringify(favorites));
    // }
    
  }

  getFavCharacter() {
    return JSON.parse(sessionStorage.getItem("Favorite"));
  }
}
