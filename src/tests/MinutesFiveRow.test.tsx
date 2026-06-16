import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MinutesFiveRow } from '../component/MinutesFiveRow';

describe('MinutesFiveRow Presentational Element Test Suite', () => {
  it('should register the container element container frame using 5m token keys', () => {
    const { getByTestId } = render(<MinutesFiveRow rowState={[false]} />);
    expect(getByTestId('clock-row-5m')).toBeInTheDocument();
  });

  it('should safely scale child layout blocks out to 11 slots', () => {
    const { getByTestId } = render(<MinutesFiveRow rowState={Array(11).fill(false)} />);
    expect(getByTestId('clock-row-5m').children).toHaveLength(11);
  });

  it('should switch style modifiers to lamp-red on triadic index positions (3rd lamp)', () => {
    const { getByTestId } = render(<MinutesFiveRow rowState={Array(11).fill(true)} />);
    expect(getByTestId('clock-row-5m').children[2]).toHaveClass('lamp-red');
  });

  it('should stay lamp-yellow on general active indexes like position 0', () => {
    const { getByTestId } = render(<MinutesFiveRow rowState={Array(11).fill(true)} />);
    expect(getByTestId('clock-row-5m').children[0]).toHaveClass('lamp-yellow');
  });

  it('should keep cells unlit if their tracking booleans map out to false states', () => {
    const { getByTestId } = render(<MinutesFiveRow rowState={[false, false, false]} />);
    expect(getByTestId('clock-row-5m').children[2]).toHaveClass('lamp-off');
  });
});