export function formatDiagnotsicData(arr){
    //console.log('Diagnostic IN =',arr);
    let diagnosticData = [{
        batteryVoltage:null,
        daysRemaining:null,
        rssi:null,
        resets:null,
        statusFlags:null,
        settingsVersion:null
    }];

    arr.forEach(item =>{
        if(item.type == 4099){
            diagnosticData[0].batteryVoltage = item.data1/1000;
            diagnosticData[0].daysRemaining = item.data2;
        }else if(item.type == 4100){
            diagnosticData[0].rssi = item.data1;
        }else if(item.type == 4101){
            diagnosticData[0].resets = item.data1
        }else if(item.type == 4102){
            diagnosticData[0].statusFlags = item.data1
        }else if(item.type == 8140){
            diagnosticData[0].settingsVersion = item.data1
        }
    })

    
    return diagnosticData;
}

export function unsignedToSigned16bit(data) {
    if (data > 32767) {
      return (data - 65536) / 100;
    } else {
      //If the number is not 16 bits no conversion is required.
      return data / 100;
    }
  }