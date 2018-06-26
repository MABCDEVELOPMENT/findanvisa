import {FormControl} from '@angular/forms';
import {ValidationResult} from './validation-result';
import { isDate } from 'moment';


export class DateValidator {
  static validDate(control:FormControl): ValidationResult {
    let datePattern = /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;
    
    if (!control.value.match(datePattern) || control.value.isUndefined || !control.value.null)
      return { "date": true };

    return null;
  }
}