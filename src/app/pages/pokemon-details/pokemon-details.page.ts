import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvolutionChain, EvolutionChainDetails } from 'src/app/models/evolution-chain.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {

  details: any;
  statsSum = 0;

  evolutionChain: EvolutionChain;
  evolutionChainDetailsList: EvolutionChainDetails[];

  depthLevel = 0;

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if(params && params.index){
      this.pokeService.getPokeDetails(params.index).subscribe(details => {
        this.details = details;

        const stats: {base_stat: number}[] = this.details.stats;

        stats.forEach(stat =>{
          this.statsSum+= stat.base_stat;
        });
      });

      this.pokeService.getSpecies(params.index).subscribe((specie: any)=>{
        if(specie && specie.evolution_chain?.url){
          this.pokeService.getEvolutionChain(specie.evolution_chain.url).subscribe(res =>{
            this.evolutionChain = res;
            this.proccessEvolutionChain();
          });
        }
      });
    }
  }  

  private proccessEvolutionChain(){
    let evoData = this.evolutionChain.chain;
    this.evolutionChainDetailsList = [];

    do {
      var evoDetails = evoData['evolution_details'][0];

      const pokemonIndex = Number(evoData.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
    
      this.evolutionChainDetailsList.push({
        speciesName: evoData.species.name,
        minLevel: !evoDetails ? 1 : evoDetails.min_level,
        triggerName: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item,
        pokemonIndex: pokemonIndex
      });
    
      evoData = evoData['evolves_to'][0];

      this.depthLevel++;
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
  }

}
