import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTimeParser } from '../hooks/useTimeParser';

describe('useTimeParser Ingestion and Validation Hook', () => {
  const mockSystemDate = new Date(2026, 5, 16, 14, 30, 45); // Locked fixed date

  it('should extract correct structural objects from valid custom parameter strings', () => {
    const { result } = renderHook(() => useTimeParser(mockSystemDate, '22:15:36'));
    expect(result.current).toEqual({ hours: 22, minutes: 15, seconds: 36 });
  });

  it('should fall back entirely to native system clock properties if string parameter is missing', () => {
    const { result } = renderHook(() => useTimeParser(mockSystemDate, undefined));
    expect(result.current).toEqual({ hours: 14, minutes: 30, seconds: 45 });
  });

  it('should treat blank whitespace strings as empty custom parameters and trigger system fallback', () => {
    const { result } = renderHook(() => useTimeParser(mockSystemDate, '    '));
    expect(result.current).toEqual({ hours: 14, minutes: 30, seconds: 45 });
  });

  it('should drop completely down to absolute zero indicators on alpha character corruption', () => {
    const { result } = renderHook(() => useTimeParser(mockSystemDate, '14:XX:45'));
    expect(result.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it('should force fallbacks to zero values if structural segmentation parts break requirements', () => {
    const { result } = renderHook(() => useTimeParser(mockSystemDate, '12:34:56:78'));
    expect(result.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });
});