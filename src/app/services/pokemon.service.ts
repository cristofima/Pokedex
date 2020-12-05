import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  constructor(private http: HttpClient) {}

  getPokemonList(offset = 0) {
    return this.http
      .get(`${environment.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map(result => {
          return result['results'];
        }),
        map(pokemon => {
          return pokemon.map((poke, index) => {
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }
 
  findPokemon(search: string) {
    return this.http.get(`${environment.baseUrl}/pokemon/${search}`).pipe(
      map(pokemon => {
        pokemon['image'] = this.getPokeImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }
 
  getPokeImage(index: number) {
    return `${environment.imageUrl}/${index}.png`;
  }
 
  getPokeDetails(index: number) {
    return this.http.get(`${environment.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }
}
