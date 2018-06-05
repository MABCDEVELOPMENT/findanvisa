import { FormControl } from "@angular/forms";

export class CustomValidator {

    static numberValidator(c: FormControl): { [key: string]: boolean } | null {
        if (c.pristine) {
            return null;
        }
        if (c.value.match(/.*[^0-9].*/)) {
            return { 'numeric': true };
        }
        return null;
    }

    static dateValidator(c: FormControl): { [key: string]: boolean } | null {
        if (c.pristine) {
            return null;
        }
        if ((c.value !== undefined && c.value !== '' && c.value != null)) {
    
            var month = null;
            var day = null;
            var year = null;
            var currentTaxYear = Number(new Date().getFullYear() - 1);
            if (c.value.indexOf('/') > -1) {
                var res = c.value.split("/");           
                if (res.length > 1) {
                    month = res[0];
                    day = res[1]
                    year = res[2];
                }                              
            }
            else {
                if (c.value.length == 8) {
                    month = c.value.substring(0, 2);
                    day = c.value.substring(2, 4);
                    year = c.value.substring(4, 8);
                }            
            }
            if (isNaN(month) || isNaN(day) || isNaN(year)) {
                return { 'dateInvalid': true };
            } 
            month = Number(month);
            day = Number(day);
            year = Number(year);
            if (month < 1 || month > 12) { // check month range
                return { 'dateInvalid': true };
            }
            if (day < 1 || day > 31) {
                return { 'dateInvalid': true };
            }
            if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
                return { 'dateInvalid': true };
            }
            if (month == 2) { // check for february 29th
                var isleap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
                if (day > 29 || (day === 29 && !isleap)) {
                    return { 'dateInvalid': true };
                }
            }
            if (year !== currentTaxYear) {
                return { 'dateYearGreaterThanTaxYear': true };
            }
        }
        return null;
    }
}