import { useState } from 'react'
import { render } from 'vitest-browser-react'
import { userEvent } from '@vitest/browser/context'
import { describe, expect, it, vi } from 'vitest'

import { format } from 'date-fns'

import { DatePicker } from '@/registry/components/date-picker'

vi.mock('@/registry/ui/calendar', () => ({
  Calendar: ({
    onSelect,
  }: {
    onSelect?: (value: Date | undefined) => void
  }) => (
    <div data-slot="calendar">
      <button
        type="button"
        data-testid="calendar-select-date"
        onClick={() => onSelect?.(new Date(2024, 0, 15))}
      >
        Select date
      </button>
    </div>
  ),
}))

describe('component date-picker', () => {
  it('renders root and default trigger', async () => {
    const screen = render(
      <DatePicker value={undefined} onValueChange={() => {}} />,
    )

    await expect.element(screen.getByText('Pick a date')).toBeVisible()
  })

  it('renders formatted selected value', async () => {
    const value = new Date(2024, 0, 15)

    const screen = render(<DatePicker value={value} onValueChange={() => {}} />)

    await expect.element(screen.getByText(format(value, 'PPP'))).toBeVisible()
  })

  it('calls onValueChange with a Date after selecting a day', async () => {
    const onValueChange = vi.fn()

    function ControlledPicker() {
      const [value, setValue] = useState<Date | undefined>(undefined)

      return (
        <DatePicker
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue)
            onValueChange(nextValue)
          }}
          calendarProps={{
            defaultMonth: new Date(2024, 0, 1),
            showOutsideDays: false,
          }}
        />
      )
    }

    const screen = render(<ControlledPicker />)

    await userEvent.click(screen.getByText('Pick a date'))
    await userEvent.click(screen.getByTestId('calendar-select-date'))

    expect(onValueChange).toHaveBeenCalled()
    const lastCall = onValueChange.mock.calls.at(-1)?.[0]
    expect(lastCall).toBeInstanceOf(Date)
  })

  it('supports custom trigger and opens calendar', async () => {
    const screen = render(
      <DatePicker
        value={undefined}
        onValueChange={() => {}}
        trigger={
          <button type="button" data-testid="custom-date-trigger">
            Open Custom Trigger
          </button>
        }
      />,
    )

    await userEvent.click(screen.getByTestId('custom-date-trigger'))

    await expect
      .element(screen.getByTestId('calendar-select-date'))
      .toBeVisible()
  })
})
