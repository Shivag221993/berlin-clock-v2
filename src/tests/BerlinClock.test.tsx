import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BerlinClock } from '../component/BerlinClock';

describe('BerlinClock Micro App - Seconds Circle View', () => {
  it('should mount the root main frame layout element successfully', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('berlin-clock-container')).toBeInTheDocument();
  });

  it('should display the isolated circular seconds tracker lamp on screen', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('seconds-lamp')).toBeInTheDocument();
  });

  it('should initialize with a yellow color modifier styling for even baseline counts', () => {
    const { getByTestId } = render(<BerlinClock customTime="12:00:00" />);
    expect(getByTestId('seconds-lamp').className).toContain('lamp-yellow');
  });

  it('should switch into a lamp-off layout block modifier style class during odd seconds counts', () => {
    const { getByTestId } = render(<BerlinClock customTime="12:00:01" />);
    expect(getByTestId('seconds-lamp').className).toContain('lamp-off');
  });

  it('should fall back to raw systemic time loops when custom time variables are absent', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('seconds-lamp')).toHaveClass('seconds-lamp');
  });
});