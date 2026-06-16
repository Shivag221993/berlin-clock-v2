import { useCurrentTime } from '../hooks/useCurrentTime';
import { useTimeParser } from '../hooks/useTimeParser';
import { useBerlinClockLogic } from '../hooks/useBerlinClockLogic';
import { ClockRow } from './ClockRow';
import { MinutesFiveRow } from './MinutesFiveRow';
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
      {/* Top Ticking Circle */}
      <div 
        data-testid="seconds-lamp"
        className={`seconds-lamp ${clockState.secondsLamp ? 'lamp-yellow' : 'lamp-off'}`} 
      />
      
      {/* Hours Tracking Blocks */}
      <ClockRow rowState={clockState.fiveHoursRow} activeColorClass="lamp-red" rowId="five-hours" />
      <ClockRow rowState={clockState.oneHourRow} activeColorClass="lamp-red" rowId="one-hour" />

      {/* Minutes Tracking Blocks */}
      <MinutesFiveRow rowState={clockState.fiveMinutesRow} />
      <ClockRow rowState={clockState.oneMinuteRow} activeColorClass="lamp-yellow" rowId="one-minute" />
    </div>
  );
}