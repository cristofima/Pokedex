import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonDetailsPageRoutingModule } from './pokemon-details-routing.module';

import { PokemonDetailsPage } from './pokemon-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonDetailsPageRoutingModule
  ],
  declarations: [PokemonDetailsPage]
})
export class PokemonDetailsPageModule {}
