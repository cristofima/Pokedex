import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanToStringPipe } from './boolean-to-string.pipe';
import { RelativePhysicalStatsPipe } from './relative-physical-stats.pipe';

@NgModule({
  declarations: [BooleanToStringPipe, RelativePhysicalStatsPipe],
  imports: [
    CommonModule
  ],
  exports: [BooleanToStringPipe, RelativePhysicalStatsPipe]
})
export class PipesModule { }
