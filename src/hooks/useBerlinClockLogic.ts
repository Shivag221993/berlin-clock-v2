export const useBerlinClockLogic = (hours: number, minutes: number, seconds: number) => {
  const secondsLamp = seconds % 2 === 0;

  // Returning an empty array fallback for rows to preserve the original shape signature safely
  return { 
    secondsLamp, 
    fiveHoursRow: [], 
    oneHourRow: [], 
    fiveMinutesRow: [], 
    oneMinuteRow: [] 
  };
};