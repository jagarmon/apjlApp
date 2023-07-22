import { Pipe, PipeTransform } from '@angular/core';
import { Work } from '../works/models/work';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  
  transform(works: Work[], searchWord: string, filterBy: string): Work[] {
    let result: Work[] = works;
    searchWord = searchWord.toLowerCase();
    
    console.log("AAAAAA: ",searchWord === "")
    if(searchWord === "") return result
    if(filterBy === "0"){
      result = works.filter(val => val.name.toLowerCase().includes(searchWord));}
    else if(filterBy === "1"){
      result = works.filter(val => val.customer.firstName.toLowerCase().includes(searchWord));      
    }else if(filterBy === "2"){
      result = works.filter(val => val.city.toLowerCase().includes(searchWord));
    }else if(filterBy === "3"){
      if(searchWord.toLowerCase() === "si" || searchWord.toLowerCase() === "pagado")
        result = works.filter(val => val.paid === true);
      else result = works.filter(val => val.paid === false);
    }
    return result;
  }

}
