import { useCurrentTime } from '../hooks/useCurrentTime';
import { useTimeParser } from '../hooks/useTimeParser';
import { useBerlinClockLogic } from '../hooks/useBerlinClockLogic';
import { ClockRow } from './ClockRow';
import './BerlinClock.css';

interface BerlinClockProps {
  customTime?: string;
}

export function BerlinClock({ customTime }: BerlinClockProps) {
  const systemTime = useCurrentTime();
  const parsedTime = useTimeParser(systemTime, customTime);
  const clockState = useBerlinClockLogic(parsedTime.hours, parsedTime.minutes, parsedTime.seconds);

  return (
    <div className="berlin-clock-main" data-testid="berlin-clock-container">
      <div 
        data-testid="seconds-lamp"
        className={`seconds-lamp ${clockState.secondsLamp ? 'lamp-yellow' : 'lamp-off'}`} 
      />
      
      {/* Render both hours tracking row components */}
      <ClockRow rowState={clockState.fiveHoursRow} activeColorClass="lamp-red" rowId="five-hours" />
      <ClockRow rowState={clockState.oneHourRow} activeColorClass="lamp-red" rowId="one-hour" />
    </div>
  );
}