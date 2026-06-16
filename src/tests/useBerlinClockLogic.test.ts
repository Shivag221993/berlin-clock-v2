import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBerlinClockLogic } from '../hooks/useBerlinClockLogic';

describe('useBerlinClockLogic Mathematical Reducer Hook', () => {
  it('should set secondsLamp to true when an even seconds value is provided', () => {
    const { result } = renderHook(() => useBerlinClockLogic(0, 0, 44));
    expect(result.current.secondsLamp).toBe(true);
  });

  it('should set secondsLamp to false when an odd seconds value is provided', () => {
    const { result } = renderHook(() => useBerlinClockLogic(0, 0, 15));
    expect(result.current.secondsLamp).toBe(false);
  });

  it('should resolve a true lamp state on the exact 00 baseline boundary mark', () => {
    const { result } = renderHook(() => useBerlinClockLogic(0, 0, 0));
    expect(result.current.secondsLamp).toBe(true);
  });

  it('should resolve a false lamp state on the absolute maximum boundary of 59 seconds', () => {
    const { result } = renderHook(() => useBerlinClockLogic(23, 59, 59));
    expect(result.current.secondsLamp).toBe(false);
  });

  it('should supply empty array allocations for rows to maintain signature compatibility', () => {
    const { result } = renderHook(() => useBerlinClockLogic(12, 30, 30));
    expect(result.current.fiveHoursRow).toEqual([]);
    expect(result.current.fiveMinutesRow).toEqual([]);
  });
});