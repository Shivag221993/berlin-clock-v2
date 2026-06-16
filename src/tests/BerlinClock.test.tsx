import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BerlinClock } from '../component/BerlinClock';

describe('BerlinClock Visual Integration Container Suite', () => {
  it('should mount primary application background framing safely', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('berlin-clock-container')).toBeInTheDocument();
  });

  it('should contain the structured top circular ticking layout bubble', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('seconds-lamp')).toBeInTheDocument();
  });

  it('should embed the generic five-hours structural tracker layout component row', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('clock-row-five-hours')).toBeInTheDocument();
  });

  it('should embed the generic single-hours structural tracker layout component row', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('clock-row-one-hour')).toBeInTheDocument();
  });

  it('should calculate individual layout rows matching given custom configurations', () => {
    const { getByTestId } = render(<BerlinClock customTime="16:00:00" />);
    const fiveHourRow = getByTestId('clock-row-five-hours');
    expect(fiveHourRow.children[2]).toHaveClass('lamp-red'); // 16 / 5 = 3 blocks active
    expect(fiveHourRow.children[3]).toHaveClass('lamp-off');
  });
});