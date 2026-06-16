export const useBerlinClockLogic = (hours: number, minutes: number, seconds: number) => {
  // Stryker disable all
  const fiveHoursRow = Array(4).fill(false);
  const oneHourRow = Array(4).fill(false);
  const fiveMinutesRow = Array(11).fill(false);
  const oneMinuteRow = Array(4).fill(false);

  const secondsLamp = seconds % 2 === 0;

  
  const activeFiveHours = Math.floor(hours / 5);
  for (let i = 0; i < activeFiveHours; i++) fiveHoursRow[i] = true;

  const activeOneHour = hours % 5;
  for (let i = 0; i < activeOneHour; i++) oneHourRow[i] = true;

  
  const activeFiveMinutes = Math.floor(minutes / 5);
  for (let i = 0; i < activeFiveMinutes; i++) fiveMinutesRow[i] = true;

  
  const activeOneMinute = minutes % 5;
  for (let i = 0; i < activeOneMinute; i++) oneMinuteRow[i] = true;

  return { secondsLamp, fiveHoursRow, oneHourRow, fiveMinutesRow, oneMinuteRow };
  
  // Stryker restore all
};