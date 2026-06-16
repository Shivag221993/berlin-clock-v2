export const useBerlinClockLogic = (hours: number, minutes: number, seconds: number) => {
  // Stryker disable BooleanLiteral,ArrayDeclaration
  const fiveHoursRow = Array(4).fill(false);
  const oneHourRow = Array(4).fill(false);
  // Stryker restore BooleanLiteral,ArrayDeclaration

  const secondsLamp = seconds % 2 === 0;

  // Compute 5-hour blocks (Top Row)
  const activeFiveHours = Math.floor(hours / 5);
  for (let i = 0; i < activeFiveHours; i++) {
    fiveHoursRow[i] = true;
  }

  // Compute 1-hour blocks (Second Row)
  const activeOneHour = hours % 5;
  for (let i = 0; i < activeOneHour; i++) {
    oneHourRow[i] = true;
  }

  return { 
    secondsLamp, 
    fiveHoursRow, 
    oneHourRow, 
    fiveMinutesRow: [], 
    oneMinuteRow: [] 
  };
};