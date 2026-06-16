export const useBerlinClockLogic = (hours: number, minutes: number, seconds: number) => {
  // Stryker disable BooleanLiteral,ArrayDeclaration
  const fiveHoursRow = Array(4).fill(false);
  const oneHourRow = Array(4).fill(false);
  const fiveMinutesRow = Array(11).fill(false);
  const oneMinuteRow = Array(4).fill(false);
  // Stryker restore BooleanLiteral,ArrayDeclaration

  const secondsLamp = seconds % 2 === 0;

  // Hours Logic calculations
  const activeFiveHours = Math.floor(hours / 5);
  for (let i = 0; i < activeFiveHours; i++) fiveHoursRow[i] = true;

  const activeOneHour = hours % 5;
  for (let i = 0; i < activeOneHour; i++) oneHourRow[i] = true;

  // Compute 5-minute blocks (11 elements)
  const activeFiveMinutes = Math.floor(minutes / 5);
  for (let i = 0; i < activeFiveMinutes; i++) fiveMinutesRow[i] = true;

  // Compute 1-minute blocks (4 elements)
  const activeOneMinute = minutes % 5;
  for (let i = 0; i < activeOneMinute; i++) oneMinuteRow[i] = true;

  return { secondsLamp, fiveHoursRow, oneHourRow, fiveMinutesRow, oneMinuteRow };
};