import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BerlinClock } from '../component/BerlinClock';

describe('BerlinClock Complete App - Form Control Interaction Suite', () => {
  it('should render the control panel form layout components smoothly', () => {
    const { getByTestId } = render(<BerlinClock />);
    expect(getByTestId('time-input-form')).toBeInTheDocument();
    expect(getByTestId('time-string-input')).toBeInTheDocument();
    expect(getByTestId('time-submit-button')).toBeInTheDocument();
  });

  it('should accept typing inputs dynamically inside the form text element field', () => {
    const { getByTestId } = render(<BerlinClock />);
    const textInput = getByTestId('time-string-input') as HTMLInputElement;
    
    fireEvent.change(textInput, { target: { value: '18:45:12' } });
    expect(textInput.value).toBe('18:45:12');
  });

  it('should update the main clock matrices display elements completely upon form submit events', () => {
    const { getByTestId } = render(<BerlinClock />);
    const textInput = getByTestId('time-string-input');
    const formPanel = getByTestId('time-input-form');

    // Simulate input submission setup
    fireEvent.change(textInput, { target: { value: '23:59:00' } });
    fireEvent.submit(formPanel);

    // Verify clock states match frozen metrics parameters completely
    expect(getByTestId('actual-digital-time').textContent).toBe('23:59:00');
    expect(getByTestId('clock-row-five-hours').children[3]).toHaveClass('lamp-red');
    expect(getByTestId('clock-row-5m').children[10]).toHaveClass('lamp-yellow');
  });

  it('should release matrix states back to system clock tracking when forms submit blank strings', () => {
    const { getByTestId } = render(<BerlinClock />);
    const textInput = getByTestId('time-string-input');
    const formPanel = getByTestId('time-input-form');

    // Freeze first
    fireEvent.change(textInput, { target: { value: '11:11:11' } });
    fireEvent.submit(formPanel);
    expect(getByTestId('actual-digital-time').textContent).toBe('11:11:11');

    // Clear and release
    fireEvent.change(textInput, { target: { value: '   ' } });
    fireEvent.submit(formPanel);
    
    // Confirms it no longer displays the hardcoded 11:11:11 freeze frame string
    expect(getByTestId('actual-digital-time').textContent).not.toBe('11:11:11');
  });

  it('should prioritize the customTime prop configuration directly if provided over panel state values', () => {
    const { getByTestId } = render(<BerlinClock customTime="05:10:15" />);
    expect(getByTestId('actual-digital-time').textContent).toBe('05:10:15');
  });
});