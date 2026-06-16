import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBerlinClockLogic } from '../hooks/useBerlinClockLogic';

describe('useBerlinClockLogic Engine Suite - Full Matrix Calculations', () => {
  it('should parse 5-minute segments correctly (e.g., 35 minutes -> 7 active lamps)', () => {
    const { result } = renderHook(() => useBerlinClockLogic(0, 35, 0));
    expect(result.current.fiveMinutesRow.filter(Boolean)).toHaveLength(7);
  });

  it('should extract remainder 1-minute iterations perfectly (e.g., 39 minutes -> 4 active lamps)', () => {
    const { result } = renderHook(() => useBerlinClockLogic(0, 39, 0));
    expect(result.current.oneMinuteRow).toEqual([true, true, true, true]);
  });

  it('should fully run up all elements at the 23:59:00 peak boundary condition', () => {
    const { result } = renderHook(() => useBerlinClockLogic(23, 59, 0));
    expect(result.current.fiveHoursRow).toEqual([true, true, true, true]);
    expect(result.current.fiveMinutesRow).toEqual(Array(11).fill(true));
    expect(result.current.oneMinuteRow).toEqual([true, true, true, true]);
  });

  it('should safely calculate quarter-hour checkpoints for internal color routing validation', () => {
    const { result } = renderHook(() => useBerlinClockLogic(0, 15, 0));
    expect(result.current.fiveMinutesRow[2]).toBe(true); // 3rd block is lit
  });
});