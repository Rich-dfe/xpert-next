export function unixTimestampToHuman(timestamp){
    var dateTimeArray = [];
    var dt = new Date(timestamp * 1000);
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var hour = dt.getHours();
    var min = dt.getMinutes();
    var sec = dt.getSeconds();
    var monthCorrected = month < 10 ? '0' + month : month;
    var dateCorrected = date < 10 ? '0' + date : date;
    //var hourCorrected = date < 10 ? '0' + hour : hour;
    //var minuteCorrected = date < 10 ? '0' + min : min;
    //var secondCorrected = date < 10 ? '0' + sec : sec;

    var date = dateCorrected + '-' + monthCorrected + '-' + year;
    dateTimeArray.push(date, hour, min, sec);
    return dateTimeArray;
  } 
