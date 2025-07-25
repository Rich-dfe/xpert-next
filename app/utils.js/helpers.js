export function hoursToSeconds(hrs) {
  return hrs * 60 * 60;
}

export function minutesToSeconds(mins) {
  return mins * 60;
}

export function intervalToSeconds(hrs, mins, secs) {
  return parseInt(hrs * 60 * 60) + parseInt(mins * 60) + parseInt(secs);
}

export function secondsToHoursMinsSecs(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  //Pad single-digit numbers with a leading zero for better formatting
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return { hrs: formattedHours, mins: formattedMinutes, secs: formattedSeconds };
}
