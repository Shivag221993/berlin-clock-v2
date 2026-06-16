import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BerlinClock } from '../component/BerlinClock';

describe('BerlinClock Production Framework Container Suite', () => {
  it('should render the top-level main frame dashboard envelope seamlessly', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('berlin-clock-container')).toBeInTheDocument();
  });

  it('should mount the structural 11-lamp layout frame component onto screen layers', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('clock-row-5m')).toBeInTheDocument();
  });

  it('should construct the absolute bottom structural 1-minute layout component row', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('clock-row-one-minute')).toBeInTheDocument();
  });

  it('should compute combined layouts simultaneously over structural target paths', () => {
    const { getByTestId } = render(<BerlinClock customTime="14:37:02" />);
    
    // 37 minutes / 5 = 7 lamps active on row 5m
    const rowFiveMin = getByTestId('clock-row-5m');
    expect(rowFiveMin.children[6]).toHaveClass('lamp-yellow'); 
    expect(rowFiveMin.children[7]).toHaveClass('lamp-off');

    // 37 minutes % 5 = 2 lamps active on bottom row
    const rowOneMin = getByTestId('clock-row-one-minute');
    expect(rowOneMin.children[1]).toHaveClass('lamp-yellow');
    expect(rowOneMin.children[2]).toHaveClass('lamp-off');
  });
});