import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBerlinClockLogic } from '../hooks/useBerlinClockLogic';

describe('useBerlinClockLogic Engine Suite - Hours Calculations', () => {
  it('should calculate correct active lamps for 5-hour row sets', () => {
    const { result } = renderHook(() => useBerlinClockLogic(13, 0, 0));
    expect(result.current.fiveHoursRow).toEqual([true, true, false, false]); // 13 / 5 = 2 blocks
  });

  it('should calculate correct active remainder lamps for 1-hour row sets', () => {
    const { result } = renderHook(() => useBerlinClockLogic(13, 0, 0));
    expect(result.current.oneHourRow).toEqual([true, true, true, false]); // 13 % 5 = 3 blocks
  });

  it('should return completely blank hours matrix outputs at midnight benchmarks', () => {
    const { result } = renderHook(() => useBerlinClockLogic(0, 0, 0));
    expect(result.current.fiveHoursRow).toEqual([false, false, false, false]);
    expect(result.current.oneHourRow).toEqual([false, false, false, false]);
  });

  it('should turn on all hour blocks concurrently at 23:00 parameters', () => {
    const { result } = renderHook(() => useBerlinClockLogic(23, 0, 0));
    expect(result.current.fiveHoursRow).toEqual([true, true, true, true]);
    expect(result.current.oneHourRow).toEqual([true, true, true, false]);
  });

  it('should verify secondsLamp state evaluates fine along with hours matrices', () => {
    const { result } = renderHook(() => useBerlinClockLogic(4, 0, 2));
    expect(result.current.secondsLamp).toBe(true);
    expect(result.current.oneHourRow).toEqual([true, true, true, true]);
  });
});