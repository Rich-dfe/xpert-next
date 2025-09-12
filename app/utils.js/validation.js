export function isEmail(value){
    return value.includes('@')
}

export function isNotEmpty(value){
    return value.trim() !== '';
}

export function hasMinLength(value, minLength){
    return value.length >= minLength
}

export function hasMaxLength(value, maxLength){
    return value.length <= maxLength;
}

export function isLessThanOrEqual(value, minValue){
    return value <= minValue;
}

export function isWaterLevelLoggerReadingValid(value){
    //the value read from the xtract app = 1000.0 to 6553.5 or 10000 to 65535
    let strValue = value.toString();
    let result = strValue.match(/^[1-5][0-9][0-9][0-9](\.\d{1})?$|^[6][0-4][0-9][0-9](\.\d{1})?$|^[6][5][0-5][0-2](\.\d{1})?$|^[6][5][5][3](\.[0-5])?$|^[1-5][0-9][0-9][0-9][0-9]$|^[6][0-4][0-9][0-9][0-9]$|^[6][5][0-4][0-9][0-9]$|^[6][5][5][0-3][0-5]$/) || [];
    if(result.length){
        return true;
    }else{
        return false;
    }
}

export function isWaterLevelRefReadingValid(value){
    //The depth of the points marked on the sensor cable = 100mm to 5000mm
    let strValue = value.toString();
    let result = strValue.match(/^[1-9][0-9][0-9]$|^[1-4][0-9][0-9][0-9]$|^(5000)$/) || [];
    if(result.length){
        return true;
    }else{
        return false;
    }
}

export function isTemperatureValid(value){
    //The temperature limits = 0.00 to 99.99
    let strValue = value.toString();
    let result = strValue.match(/^[0-9](\.\d{0,2})?$|^[0-9][0-9](\.\d{0,2})?$/) || [];
    if(result.length){
        return true;
    }else{
        return false;
    }
}

export function roundToDecimalPlace(num) {
    const numStr = num.toString();
    //if the number has 5 digits it does not have a decimal place in it
    if(numStr.length == 5){
            return num/10;
    }else return num;
    
}