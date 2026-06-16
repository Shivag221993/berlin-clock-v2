import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BerlinClock } from '../component/BerlinClock';

describe('BerlinClock Production Framework Container Suite with Digital Readout', () => {
  it('should render the top-level main frame dashboard envelope seamlessly', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('berlin-clock-container')).toBeInTheDocument();
  });

  it('should render the actual digital clock text viewport indicator on the panel', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('actual-digital-time')).toBeInTheDocument();
  });

  it('should format digital strings correctly with padded double zero metrics', () => {
    const { getByTestId } = render(<BerlinClock customTime="04:07:09" />);
    expect(getByTestId('actual-digital-time').textContent).toBe('04:07:09');
  });

  it('should host the structural 11-lamp layout frame component onto screen layers', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('clock-row-5m')).toBeInTheDocument();
  });

  it('should compute combined layouts simultaneously over structural target paths', () => {
    const { getByTestId } = render(<BerlinClock customTime="14:37:02" />);
    
    // Check digital display
    expect(getByTestId('actual-digital-time').textContent).toBe('14:37:02');

    // 37 minutes / 5 = 7 lamps active on row 5m
    const rowFiveMin = getByTestId('clock-row-5m');
    expect(rowFiveMin.children[6]).toHaveClass('lamp-yellow'); 
    expect(rowFiveMin.children[7]).toHaveClass('lamp-off');
  });
});