import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BerlinClock } from '../component/BerlinClock';

describe('BerlinClock Complete App - Reset Action Control Suite', () => {
  it('should verify the new reset action node component button mounts successfully', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('time-reset-button')).toBeInTheDocument();
  });

  it('should clear text characters out of the input entry box upon click events', () => {
    const { getByTestId } = render(<BerlinClock />);
    const textInput = getByTestId('time-string-input') as HTMLInputElement;
    const resetBtn = getByTestId('time-reset-button');

    fireEvent.change(textInput, { target: { value: '15:45:00' } });
    expect(textInput.value).toBe('15:45:00');

    fireEvent.click(resetBtn);
    expect(textInput.value).toBe('');
  });

  it('should restore live digital tracking readout loops immediately upon processing resets', () => {
    const { getByTestId } = render(<BerlinClock />);
    const textInput = getByTestId('time-string-input');
    const formPanel = getByTestId('time-input-form');
    const resetBtn = getByTestId('time-reset-button');

    
    fireEvent.change(textInput, { target: { value: '20:20:20' } });
    fireEvent.submit(formPanel);
    expect(getByTestId('actual-digital-time').textContent).toBe('20:20:20');

    
    fireEvent.click(resetBtn);
    expect(getByTestId('actual-digital-time').textContent).not.toBe('20:20:20');
  });

  it('should shift active shape elements back into synchronization paths on layout resets', () => {
    const { getByTestId } = render(<BerlinClock />);
    const textInput = getByTestId('time-string-input');
    const formPanel = getByTestId('time-input-form');
    const resetBtn = getByTestId('time-reset-button');

    fireEvent.change(textInput, { target: { value: '23:59:59' } });
    fireEvent.submit(formPanel);
    
    
    expect(getByTestId('clock-row-five-hours').children[3]).toHaveClass('lamp-red');

    fireEvent.click(resetBtn);
    
    expect(getByTestId('berlin-clock-container')).toBeInTheDocument();
  });

  it('should verify original prop configurations are still prioritized if explicitly specified by container nodes', () => {
    const { getByTestId } = render(<BerlinClock customTime="01:02:03" />);
    const resetBtn = getByTestId('time-reset-button');

    fireEvent.click(resetBtn);
    
    expect(getByTestId('actual-digital-time').textContent).toBe('01:02:03');
  });
});