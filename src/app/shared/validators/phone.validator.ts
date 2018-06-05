import {FormControl} from '@angular/forms';
import {ValidationResult} from './validation-result';
import { isDate } from 'moment';


export class PhoneValidator {
  static validPhone(control:FormControl): ValidationResult {
    let phonePattern = /^(?:(55\d{2})|\d{2})[6-9]\d{8}$/;
    
    if (!control.value.match(phonePattern) || control.value.null)
      return { "phone": true };

    return null;
  }
}