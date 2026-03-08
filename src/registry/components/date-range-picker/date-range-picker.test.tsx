import { useState } from 'react'
import { render } from 'vitest-browser-react'
import { userEvent } from '@vitest/browser/context'
import { describe, expect, it, vi } from 'vitest'

import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

import { DateRangePicker } from '@/registry/components/date-range-picker'

vi.mock('@/registry/ui/calendar', () => ({
  Calendar: ({
    onSelect,
  }: {
    onSelect?: (value: { from?: Date; to?: Date } | undefined) => void
  }) => (
    <div data-slot="calendar">
      <button
        type="button"
        data-testid="calendar-select-start"
        onClick={() => onSelect?.({ from: new Date(2024, 0, 10) })}
      >
        Select start
      </button>
      <button
        type="button"
        data-testid="calendar-select-end"
        onClick={() =>
          onSelect?.({ from: new Date(2024, 0, 10), to: new Date(2024, 0, 20) })
        }
      >
        Select end
      </button>
    </div>
  ),
}))

describe('component date-range-picker', () => {
  it('renders root and default trigger', async () => {
    const screen = render(
      <DateRangePicker value={undefined} onValueChange={() => {}} />,
    )

    await expect.element(screen.getByText('Pick a date range')).toBeVisible()
  })

  it('renders formatted selected range value', async () => {
    const from = new Date(2024, 0, 10)
    const to = new Date(2024, 0, 20)

    const screen = render(
      <DateRangePicker value={{ from, to }} onValueChange={() => {}} />,
    )

    await expect
      .element(
        screen.getByText(
          `${format(from, 'LLL dd, y')} - ${format(to, 'LLL dd, y')}`,
        ),
      )
      .toBeVisible()
  })

  it('calls onValueChange with a complete range after two selections', async () => {
    const onValueChange = vi.fn()

    function ControlledRangePicker() {
      const [value, setValue] = useState<DateRange | undefined>(undefined)

      return (
        <DateRangePicker
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue)
            onValueChange(nextValue)
          }}
          numberOfMonths={1}
          calendarProps={{
            defaultMonth: new Date(2024, 0, 1),
            showOutsideDays: false,
          }}
        />
      )
    }

    const screen = render(<ControlledRangePicker />)

    await userEvent.click(screen.getByText('Pick a date range'))
    await userEvent.click(screen.getByTestId('calendar-select-start'))
    await userEvent.click(screen.getByTestId('calendar-select-end'))

    const hasCompleteRange = onValueChange.mock.calls.some(([arg]) => {
      return arg?.from instanceof Date && arg?.to instanceof Date
    })

    expect(hasCompleteRange).toBe(true)
  })

  it('supports custom trigger and opens calendar', async () => {
    const screen = render(
      <DateRangePicker
        value={undefined}
        onValueChange={() => {}}
        trigger={
          <button type="button" data-testid="custom-date-range-trigger">
            Open Custom Range Trigger
          </button>
        }
      />,
    )

    await userEvent.click(screen.getByTestId('custom-date-range-trigger'))

    await expect
      .element(screen.getByTestId('calendar-select-start'))
      .toBeVisible()
  })
})
