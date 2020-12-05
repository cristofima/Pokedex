import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {

  details: any;

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if(params && params.index){
      this.pokeService.getPokeDetails(params.index).subscribe(details => {
        this.details = details;

        this.checkImages();
      })
    }
  }

  private checkImages(){
    if(this.details.images.length > 2){
      this.details.images = this.details.images.slice(0, this.details.images.length - 2);
    }
  }

}
