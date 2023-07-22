import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './models/card';

@Pipe({
  name: 'filterCardList'
})
export class FilterCardListPipe implements PipeTransform {
  //TODO POR ALfun motivo no entra al filter, aunque si que entra al if
  transform(cards: Card[], searchWord: string, filterBy: string): Card[] {
    let result: Card[] = cards;
    searchWord = searchWord.toLowerCase();
    if(searchWord === "") return result
    if(filterBy === "0"){  
      result = cards.filter(val =>{ 
        let fullName: string = val.field2value + " " + val.field3value;
        return fullName.toLowerCase().includes(searchWord)
      });       
    }else if(filterBy === "1"){
      result = cards.filter(val => val.field1value.toLowerCase().includes(searchWord));
    }else if(filterBy === "2"){
      result = cards.filter(val => val.field4value.toLowerCase().includes(searchWord));
    }else if(filterBy === "3"){
      result = cards.filter(val => val.field5value.toLowerCase().includes(searchWord));
    }
    return result;
  }

}
