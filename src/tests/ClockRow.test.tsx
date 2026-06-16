import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ClockRow } from '../component/ClockRow';

describe('ClockRow Component UI Suite', () => {
  it('should render container wrapping element with correct id attribute', () => {
    const { getByTestId } = render(<ClockRow rowState={[false]} activeColorClass="lamp-red" rowId="test" />);
    expect(getByTestId('clock-row-test')).toBeInTheDocument();
  });

  it('should create matching quantities of domestic lamp DOM blocks based on inputs', () => {
    const { getByTestId } = render(<ClockRow rowState={[false, false, false]} activeColorClass="lamp-red" rowId="test" />);
    expect(getByTestId('clock-row-test').children).toHaveLength(3);
  });

  it('should attach activeColorClass string to elements evaluating to true', () => {
    const { getByTestId } = render(<ClockRow rowState={[true]} activeColorClass="lamp-red" rowId="test" />);
    expect(getByTestId('clock-row-test').children[0]).toHaveClass('lamp-red');
  });

  it('should assign fallback off classes to fields evaluating to false', () => {
    const { getByTestId } = render(<ClockRow rowState={[false]} activeColorClass="lamp-red" rowId="test" />);
    expect(getByTestId('clock-row-test').children[0]).toHaveClass('lamp-off');
  });

  it('should run gracefully without exceptions on empty arrays', () => {
    const { getByTestId } = render(<ClockRow rowState={[]} activeColorClass="lamp-red" rowId="test" />);
    expect(getByTestId('clock-row-test').children).toHaveLength(0);
  });
});