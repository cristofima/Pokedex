import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanToStringPipe } from './boolean-to-string.pipe';

@NgModule({
  declarations: [BooleanToStringPipe],
  imports: [
    CommonModule
  ],
  exports: [BooleanToStringPipe]
})
export class PipesModule { }
