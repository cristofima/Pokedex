import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativePhysicalStats'
})
export class RelativePhysicalStatsPipe implements PipeTransform {

  transform(value: number): string {
    if(value != null){
      if(value == 1){
        return "Attack > Defense";
      }else if(value == 0){
        return "Attack = Defense";
      }else if(value == -1){
        return "Attack < Defense";
      }
    }
    
    return null;
  }

}
