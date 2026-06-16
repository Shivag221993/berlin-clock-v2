import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrentTime } from '../hooks/useCurrentTime';

describe('useCurrentTime Lifecycle Ticker Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize hook state with a valid Date object instance', () => {
    const { result } = renderHook(() => useCurrentTime());
    expect(result.current).toBeInstanceOf(Date);
  });

  it('should instantiate exactly one 1-second interval listener on mount', () => {
    vi.spyOn(global, 'setInterval');
    renderHook(() => useCurrentTime());
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  it('should call clearInterval on teardown to prevent application memory leaks', () => {
    vi.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useCurrentTime());
    unmount();
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should preserve identical timestamps inside microsecond execution frames', () => {
    const { result } = renderHook(() => useCurrentTime());
    const snapshotMs = result.current.getTime();
    
    vi.advanceTimersByTime(10); 
    expect(result.current.getTime()).toBe(snapshotMs);
  });
});