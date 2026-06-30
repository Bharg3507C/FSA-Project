import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

// ---------------------------------------------------------------------------
// Leave request validation logic.
// This mirrors the validation that should be applied in the POST /api/leave
// route handler in src/index.js before writing to the database.
// ---------------------------------------------------------------------------

const VALID_LEAVE_TYPES = ['Annual Leave', 'Medical Leave', 'Emergency Leave']

function validateLeaveRequest(data) {
  if (!data.employeeId) return { valid: false, error: 'Employee ID required' }
  if (!data.startDate)  return { valid: false, error: 'Start date required' }
  if (!data.endDate)    return { valid: false, error: 'End date required' }
  if (!data.leaveType)  return { valid: false, error: 'Leave type required' }

  if (!VALID_LEAVE_TYPES.includes(data.leaveType)) {
    return { valid: false, error: 'Invalid leave type' }
  }

  const start = new Date(data.startDate)
  const end   = new Date(data.endDate)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { valid: false, error: 'Invalid date format' }
  }

  if (end < start) {
    return { valid: false, error: 'End date must be on or after start date' }
  }

  return { valid: true }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('validateLeaveRequest — required fields', () => {
  it('rejects a request with no employeeId', () => {
    const result = validateLeaveRequest({
      startDate: '2026-07-01', endDate: '2026-07-03', leaveType: 'Annual Leave',
    })
    assert.equal(result.valid, false)
    assert.equal(result.error, 'Employee ID required')
  })

  it('rejects a request with no startDate', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042', endDate: '2026-07-03', leaveType: 'Annual Leave',
    })
    assert.equal(result.valid, false)
    assert.equal(result.error, 'Start date required')
  })

  it('rejects a request with no endDate', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042', startDate: '2026-07-01', leaveType: 'Annual Leave',
    })
    assert.equal(result.valid, false)
    assert.equal(result.error, 'End date required')
  })

  it('rejects a request with no leaveType', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042', startDate: '2026-07-01', endDate: '2026-07-03',
    })
    assert.equal(result.valid, false)
    assert.equal(result.error, 'Leave type required')
  })
})

describe('validateLeaveRequest — leave type validation', () => {
  it('rejects an unrecognised leave type', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042',
      startDate:  '2026-07-01',
      endDate:    '2026-07-03',
      leaveType:  'Sabbatical',
    })
    assert.equal(result.valid, false)
    assert.equal(result.error, 'Invalid leave type')
  })

  it('accepts "Annual Leave"', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042', startDate: '2026-07-01', endDate: '2026-07-03',
      leaveType: 'Annual Leave',
    })
    assert.equal(result.valid, true)
  })

  it('accepts "Medical Leave"', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042', startDate: '2026-07-14', endDate: '2026-07-14',
      leaveType: 'Medical Leave',
    })
    assert.equal(result.valid, true)
  })
})

describe('validateLeaveRequest — date range logic', () => {
  it('rejects end date before start date', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042',
      startDate:  '2026-07-10',
      endDate:    '2026-07-05',
      leaveType:  'Annual Leave',
    })
    assert.equal(result.valid, false)
    assert.match(result.error, /end date/i)
  })

  it('accepts a same-day request (start equals end)', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042',
      startDate:  '2026-07-15',
      endDate:    '2026-07-15',
      leaveType:  'Emergency Leave',
    })
    assert.equal(result.valid, true)
  })

  it('accepts a multi-day request', () => {
    const result = validateLeaveRequest({
      employeeId: 'EMP-0042',
      startDate:  '2026-08-04',
      endDate:    '2026-08-06',
      leaveType:  'Annual Leave',
    })
    assert.equal(result.valid, true)
  })
})
