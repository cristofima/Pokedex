import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  pokemonList: any[] = [];
  private pokemonOriginalList: any[] = [];
  private offset = 0;

  backToTop: boolean;

  @ViewChild(IonContent) content: IonContent;

  constructor(private platform: Platform, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe((res: any[])=>{
      this.pokemonList = res;
      this.pokemonOriginalList = res;
    });
  }

  loadData($event){
    this.offset+= 25;

    this.pokemonService.getPokemonList(this.offset).subscribe((res: any[])=>{
      $event.target.complete();
      this.pokemonList = this.pokemonOriginalList.concat(res);
      this.pokemonOriginalList = this.pokemonList;

      if (this.pokemonList.length >= 890) {
        $event.target.disabled = true;
      }
    });
  }

  getScrollPos(pos: number) {
    if (pos > this.platform.height()) {
      this.backToTop = true;
    } else {
      this.backToTop = false;
    }
  }

  goToTop() {
    this.content.scrollToTop(1000);
  }

  searchPokemon($event: { detail: { value: string }}){
    this.pokemonList = this.pokemonOriginalList.filter(x => x.name.toLocaleLowerCase().includes($event.detail.value.toLocaleLowerCase()));
  }

}
