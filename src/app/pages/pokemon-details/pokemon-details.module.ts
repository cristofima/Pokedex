import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonDetailsPageRoutingModule } from './pokemon-details-routing.module';

import { PokemonDetailsPage } from './pokemon-details.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    PokemonDetailsPageRoutingModule
  ],
  declarations: [PokemonDetailsPage]
})
export class PokemonDetailsPageModule {}
