import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvolutionChain, EvolutionChainDetails } from 'src/app/models/evolution-chain.model';
import { PokemonSpecie } from 'src/app/models/pokemon-specie.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {

  details: any;
  statsSum = 0;

  pokemonSpecie: PokemonSpecie;
  evolutionChain: EvolutionChain;
  evolutionChainDetailsList: EvolutionChainDetails[];

  constructor(private router: Router,private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if(params && params.index){
      this.details = {};
      this.details.id = params.index;

      this.pokeService.getPokeDetails(params.index).subscribe(details => {
        this.details = details;

        const stats: {base_stat: number}[] = this.details.stats;

        stats.forEach(stat =>{
          this.statsSum+= stat.base_stat;
        });
      });

      this.pokeService.getSpecies(params.index).subscribe((specie: any)=>{
        this.pokemonSpecie = specie;
        if(this.pokemonSpecie && this.pokemonSpecie.evolution_chain?.url){
          this.pokeService.getEvolutionChain(this.pokemonSpecie.evolution_chain.url).subscribe(res =>{
            this.evolutionChain = res;
            this.processEvolutionChain();
          });
        }
      });
    }
  }  

  goToPokemon(index: number){
    this.router.navigate(["/pokemon-details/"+index]);
  }

  private processEvolutionChain(){
    let evoData = this.evolutionChain.chain;
    this.evolutionChainDetailsList = [];

    do {
      let evoDetails = evoData['evolution_details'][evoData['evolution_details'].length -1];

      if(evoDetails && !this.hasCorrectEvoDetailsData(evoDetails)){
        evoDetails = evoData['evolution_details'][0];
      };

      const pokemonIndex = Number(evoData.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
    
      this.evolutionChainDetailsList.push({
        speciesName: evoData.species.name,
        minLevel: evoDetails?.min_level,
        minHappiness: evoDetails?.min_happiness,
        timeOfDay: evoDetails?.time_of_day,
        triggerName: evoDetails?.trigger?.name,
        item: evoDetails?.item,
        locationName: evoDetails?.location?.name,
        minAffection: evoDetails?.min_affection,
        knownMove: evoDetails?.known_move?.name,
        minBeauty: evoDetails?.min_beauty,
        heldItem: evoDetails?.held_item?.name,
        needsOverworldRain: evoDetails?.needs_overworld_rain,
        gender: evoDetails?.gender ? (evoDetails.gender == 1 ? 'Female' : 'Male') : null,
        relativePhysicalStats: evoDetails?.relative_physical_stats,
        pokemonIndex: pokemonIndex
      });

      let envolves: any[] = evoData['evolves_to'];

      let envolveIndex = 0;

      const scope = this;

      envolves.forEach(function(e, index, array){
        const pokeIndex = Number(e.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
        if(pokeIndex == scope.details.id){
          envolveIndex = index;
        }
      });
    
      evoData = evoData['evolves_to'][envolveIndex];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    this.getPokemonTypes();
  }

  private getPokemonTypes(){
    const scope = this;
    
    this.evolutionChainDetailsList.forEach(function(evo, index, array){
      if(evo.pokemonIndex == scope.details.id){
        array[index].types = scope.details.types.map((x: { type: { name: string }}) => x.type.name);
      }else{
        scope.pokeService.getPokeDetails(evo.pokemonIndex).subscribe((res: any)=>{
          if(res && res.types){
            array[index].types = res.types.map((x: { type: { name: string }}) => x.type.name);
          }
        });
      }
    });
  }

  private hasCorrectEvoDetailsData(evoDetails: any){
    if(evoDetails.trigger?.name == 'level-up'){
      if(evoDetails.min_level || evoDetails.min_happiness || evoDetails.min_affection || evoDetails.location?.name 
        || evoDetails.min_beauty || evoDetails.known_move?.name || (evoDetails.time_of_day && evoDetails.held_item?.name)){
        return true;
      }else{
        return false;
      }
    }

    return true;
  }

}
