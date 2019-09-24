import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setFavCharacter(character: any) {
    var favorites = this.getFavCharacter();
    var result = [];

    if(favorites) {
      favorites.push(character);
      result = favorites;
    } else {
      result.push(character);
    }

    console.log(JSON.stringify(character));
    sessionStorage.setItem('Favorite', JSON.stringify(result));
  }

  getFavCharacter() {
    return JSON.parse(sessionStorage.getItem("Favorite"));
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
   
  }

  setCompareCharacter(character: any) {
    var compared = this.getCompareCharacter();
    var result = [];

    if(compared) {
      compared.push(character);
      result = compared;
    } else {
      result.push(character);
    }

    sessionStorage.setItem('Compare', JSON.stringify(result));
  }

  getCompareCharacter() {
    return JSON.parse(sessionStorage.getItem("Compare"));
  }
  
  removeComparedCharacter(character: any) {
    var compared = this.getCompareCharacter();

    var count = 0;
    compared.forEach(fav => {
      if(fav.name === character.name) {
        compared.splice(count, 1);
      }
      count++;
    });
    sessionStorage.setItem('Compare', JSON.stringify(compared));
   
  }

}
