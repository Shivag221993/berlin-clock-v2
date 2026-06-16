import { useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [submittedTime, setSubmittedTime] = useState<string | undefined>(undefined);

  const systemTime = useCurrentTime();
  const targetTimeStr = customTime !== undefined ? customTime : submittedTime;
  
  const parsedTime = useTimeParser(systemTime, targetTimeStr);
  const clockState = useBerlinClockLogic(parsedTime.hours, parsedTime.minutes, parsedTime.seconds);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedTime(inputValue.trim() === '' ? undefined : inputValue);
  };

  const handleReset = () => {
    setInputValue('');
    setSubmittedTime(undefined);
  };

  return (
    <div className="berlin-clock-main" data-testid="berlin-clock-container">

      <div className="actual-time-display" data-testid="actual-digital-time">
        {formatDigit(parsedTime.hours)}:{formatDigit(parsedTime.minutes)}:{formatDigit(parsedTime.seconds)}
      </div>

      <div 
        data-testid="seconds-lamp"
        className={`seconds-lamp ${clockState.secondsLamp ? 'lamp-yellow' : 'lamp-off'}`} 
      />
      
      <ClockRow rowState={clockState.fiveHoursRow} activeColorClass="lamp-red" rowId="five-hours" />
      <ClockRow rowState={clockState.oneHourRow} activeColorClass="lamp-red" rowId="one-hour" />

      <MinutesFiveRow rowState={clockState.fiveMinutesRow} />
      <ClockRow rowState={clockState.oneMinuteRow} activeColorClass="lamp-yellow" rowId="one-minute" />

      <form onSubmit={handleFormSubmit} className="control-input-form" data-testid="time-input-form">
        <input 
          type="text"
          placeholder="HH:MM:SS"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="time-text-input"
          data-testid="time-string-input"
        />
        <div className="button-group">
          <button type="submit" className="time-submit-btn" data-testid="time-submit-button">
            Set
          </button>
          <button 
            type="button" 
            onClick={handleReset} 
            className="time-reset-btn" 
            data-testid="time-reset-button"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}