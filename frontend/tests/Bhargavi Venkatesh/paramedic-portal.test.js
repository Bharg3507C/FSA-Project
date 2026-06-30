import { describe, it, expect } from 'vitest'

// ---------------------------------------------------------------------------
// Inline copies of the schedule utility functions under test.
// These mirror the logic in src/App.jsx and can be extracted to a shared
// utility module if the codebase is split into smaller files.
// ---------------------------------------------------------------------------

const SCHEDULE = {
  '2026-06': {
    1: 'morning', 2: 'morning', 3: 'morning', 4: 'morning',
    5: 'rest', 6: 'rest',
    7: 'night', 8: 'night', 9: 'night', 10: 'night',
    11: 'leaveApproved', 12: 'leaveApproved',
    13: 'morning', 14: 'morning', 15: 'morning', 16: 'morning',
    17: 'rest', 18: 'leavePending',
    19: 'night', 20: 'night', 21: 'night', 22: 'night',
    23: 'rest', 24: 'rest',
    25: 'morning', 26: 'morning', 27: 'morning', 28: 'morning', 29: 'morning',
    30: 'rest',
  },
  '2026-07': {
    1: 'rest', 2: 'rest',
    3: 'night', 4: 'night', 5: 'night', 6: 'night',
    7: 'rest', 8: 'rest',
    9: 'morning', 10: 'morning', 11: 'morning', 12: 'morning',
    13: 'rest',
    14: 'night', 15: 'night', 16: 'night', 17: 'night',
    18: 'rest', 19: 'rest',
    20: 'morning', 21: 'morning', 22: 'morning', 23: 'morning',
    24: 'rest',
    25: 'night', 26: 'night', 27: 'night', 28: 'night',
    29: 'morning', 30: 'morning', 31: 'morning',
  },
}

function getShift(year, month, day) {
  const key = `${year}-${String(month + 1).padStart(2, '0')}`
  return SCHEDULE[key]?.[day] || 'rest'
}

function isWorkingShift(shiftType) {
  return shiftType === 'morning' || shiftType === 'night'
}

function toMonthKey(year, month) {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

function countWorkingDays(monthData) {
  return Object.values(monthData).filter(isWorkingShift).length
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('getShift', () => {
  it('returns "rest" for a month not in the schedule', () => {
    expect(getShift(2025, 0, 1)).toBe('rest')
    expect(getShift(2027, 5, 15)).toBe('rest')
  })

  it('returns the correct shift type for a known morning day', () => {
    expect(getShift(2026, 5, 1)).toBe('morning')   // June 1
    expect(getShift(2026, 5, 13)).toBe('morning')  // June 13
  })

  it('returns the correct shift type for a known night day', () => {
    expect(getShift(2026, 5, 7)).toBe('night')     // June 7
    expect(getShift(2026, 6, 3)).toBe('night')     // July 3
  })

  it('returns "leaveApproved" for an approved leave day', () => {
    expect(getShift(2026, 5, 11)).toBe('leaveApproved')
    expect(getShift(2026, 5, 12)).toBe('leaveApproved')
  })

  it('returns "leavePending" for a pending leave day', () => {
    expect(getShift(2026, 5, 18)).toBe('leavePending')
  })

  it('returns "rest" for a rest day', () => {
    expect(getShift(2026, 5, 5)).toBe('rest')
    expect(getShift(2026, 5, 30)).toBe('rest')
  })
})

describe('isWorkingShift', () => {
  it('returns true for morning and night only', () => {
    expect(isWorkingShift('morning')).toBe(true)
    expect(isWorkingShift('night')).toBe(true)
  })

  it('returns false for non-working shift types', () => {
    expect(isWorkingShift('rest')).toBe(false)
    expect(isWorkingShift('leaveApproved')).toBe(false)
    expect(isWorkingShift('leavePending')).toBe(false)
  })
})

describe('toMonthKey', () => {
  it('formats month as YYYY-MM with zero padding', () => {
    expect(toMonthKey(2026, 5)).toBe('2026-06')
    expect(toMonthKey(2026, 6)).toBe('2026-07')
    expect(toMonthKey(2026, 11)).toBe('2026-12')
    expect(toMonthKey(2026, 0)).toBe('2026-01')
  })
})

describe('countWorkingDays', () => {
  it('counts 21 working days for June 2026', () => {
    expect(countWorkingDays(SCHEDULE['2026-06'])).toBe(21)
  })

  it('counts correctly for July 2026', () => {
    // July: night days (3-6,14-17,25-28) = 12, morning days (9-12,20-23,29-31) = 11 → 23 total
    expect(countWorkingDays(SCHEDULE['2026-07'])).toBe(23)
  })

  it('returns 0 for an empty month', () => {
    expect(countWorkingDays({})).toBe(0)
  })
})
