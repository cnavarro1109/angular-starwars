import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ProxyService } from '../services/proxy.service';
import { SessionService } from '../services/session.service';
import { createComponent } from '@angular/compiler/src/core';
import { CompareComponent } from '../compare/compare.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  @ViewChild('compareEl', { static: true, read: ViewContainerRef}) compareEl: ViewContainerRef;

  characters: any;
  favCharacters: [];
  loading: boolean = false;
  components = [];
  compareCount: number = 0;
  maxCompare: number = 6;
  
  constructor(
    private proxyService: ProxyService,
    private sessionService: SessionService,
    private resolver: ComponentFactoryResolver
  ) { }

  
  ngOnInit(){
    this.loading = true;
    this.proxyService.httpGet('https://swapi.co/api/people/').subscribe(
      (response: any) => {
        // console.log(response.body.results);
        this.characters = response.body.results;

        const favorites = this.sessionService.getFavCharacter();
        const compare = this.sessionService.getFavCharacter();
        
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
    // console.log(name);
  }


  favCharacter(character: any) {
    if(!character.isFavorite) {
       this.sessionService.setFavCharacter(character);
    } else {
      this.sessionService.removeFavCharacter(character);
    }
    character.isFavorite = !character.isFavorite; 

    // console.log(`Favorite character ${character}`);
  }

  compareCharacter(character: any) {
    if (!character.compare && (this.compareCount < this.maxCompare)) {
      this.createCompareComponent(character);
      this.compareCount++;
      character.compare = !character.compare;
    } else if (character.compare){
      this.removeCompareComponent(character.name);
      this.compareCount--;
      character.compare = !character.compare;
    }
  }

  createCompareComponent(character: any) {
    const compareComponent = this.resolver.resolveComponentFactory(CompareComponent);
    const compareRef = this.compareEl.createComponent(compareComponent);
    this.components.push(compareRef);

    compareRef.instance.character = character;
  }

  removeCompareComponent(name: string) {
    const component = this.components.find((x) => x.instance.character.name === name);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      this.compareEl.remove(this.compareEl.indexOf(component));
      this.components.splice(componentIndex, 1);
    }
  }

}
