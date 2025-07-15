export function hexToDecimal(sn){
    
    return parseInt(sn, 16);
  } 

export function decimalToHex(sn){
    if(typeof sn === 'string'){
        sn = parseInt(sn);
    } 
    return sn.toString(16).toUpperCase();
}