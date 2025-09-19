export function unixTimestampToHuman(timestamp) {
  var dateTimeArray = [];
  var dt = new Date(timestamp * 1000);
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var date = dt.getDate();
  var hour = dt.getHours();
  var min = dt.getMinutes();
  var sec = dt.getSeconds();
  var monthCorrected = month < 10 ? "0" + month : month;
  var dateCorrected = date < 10 ? "0" + date : date;
  //var hourCorrected = date < 10 ? '0' + hour : hour;
  //var minuteCorrected = date < 10 ? '0' + min : min;
  //var secondCorrected = date < 10 ? '0' + sec : sec;

  var date = dateCorrected + "-" + monthCorrected + "-" + year;
  dateTimeArray.push(date, hour, min, sec);
  return dateTimeArray;
}

export function formatISO6801Date(isoString, locale) {
  const dateObject = new Date(isoString);

  const options = {
    //weekday: "long",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Set to false for 24-hour format
  };

  if (locale === "local") {
    // const hours = dateObject.getHours(); // 0-23
    // const minutes = dateObject.getMinutes(); // 0-59
    // const seconds = dateObject.getSeconds(); // 0-59
    const localTimeFormatted = dateObject.toLocaleString("en-GB",options);
    return localTimeFormatted;
  }

  if (locale === "utc") {
    // const utcHours = dateObject.getUTCHours();
    // const utcMinutes = dateObject.getUTCMinutes();
    // const utcSeconds = dateObject.getUTCSeconds();
    const utcTimeFormatted = dateObject.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });
    return utcTimeFormatted;
  }
}
