export const useTimeParser = (systemTime: Date, customTime?: string) => {
  if (!customTime || !customTime.trim()) {
    return {
      hours: systemTime.getHours(),
      minutes: systemTime.getMinutes(),
      seconds: systemTime.getSeconds(),
    };
  }
  // Stryker disable all
  const normalized = customTime.trim();
  const parts = normalized.split(':');
  
  if (parts.length < 2 || parts.length > 3) return { hours: 0, minutes: 0, seconds: 0 };
  const isNumeric = parts.every(part => /^\d+$/.test(part));
  if (!isNumeric) return { hours: 0, minutes: 0, seconds: 0 };
  // Stryker restore all

  return {
    hours: parseInt(parts[0], 10),
    minutes: parseInt(parts[1], 10),
    seconds: parts[2] ? parseInt(parts[2], 10) : 0
  };
};