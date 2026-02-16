import { act, useState, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { format } from 'date-fns'

vi.mock('@/registry/ui/calendar', () => ({
  Calendar: ({
    onSelect,
  }: {
    onSelect?: (value: { from?: Date; to?: Date } | undefined) => void
  }) => (
    <div data-slot='calendar'>
      <button
        type='button'
        data-testid='calendar-select-start'
        onClick={() => onSelect?.({ from: new Date(2024, 0, 10) })}
      >
        Select start
      </button>
      <button
        type='button'
        data-testid='calendar-select-end'
        onClick={() =>
          onSelect?.({ from: new Date(2024, 0, 10), to: new Date(2024, 0, 20) })
        }
      >
        Select end
      </button>
    </div>
  ),
}))

import { DateRangePicker } from '@/registry/components/date-range-picker'

describe('component date-range-picker', () => {
  let root: Root | null = null
  let container: HTMLDivElement | null = null

  async function mount(ui: ReactNode) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    await act(async () => {
      root?.render(ui)
    })
  }

  async function click(target: Element | null) {
    if (!target) {
      throw new Error('Missing click target')
    }

    await act(async () => {
      target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
      target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
  }

  afterEach(async () => {
    await act(async () => {
      root?.unmount()
    })
    container?.remove()
    root = null
    container = null
  })

  it('renders root and default trigger', async () => {
    await mount(<DateRangePicker value={undefined} onValueChange={() => {}} />)

    expect(document.querySelector("[data-slot='date-range-picker']")).toBeTruthy()
    expect(document.querySelector("[data-slot='date-range-picker-trigger']")).toBeTruthy()
    expect(document.body.textContent).toContain('Pick a date range')
  })

  it('renders formatted selected range value', async () => {
    const from = new Date(2024, 0, 10)
    const to = new Date(2024, 0, 20)

    await mount(
      <DateRangePicker value={{ from, to }} onValueChange={() => {}} />,
    )

    expect(document.body.textContent).toContain(
      `${format(from, 'LLL dd, y')} - ${format(to, 'LLL dd, y')}`,
    )
  })

  it('calls onValueChange with a complete range after two selections', async () => {
    const onValueChange = vi.fn()

    function ControlledRangePicker() {
      const [value, setValue] = useState<{ from?: Date; to?: Date } | undefined>(
        undefined,
      )

      return (
        <DateRangePicker
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue)
            onValueChange(nextValue)
          }}
          numberOfMonths={1}
          calendarProps={{ defaultMonth: new Date(2024, 0, 1), showOutsideDays: false }}
        />
      )
    }

    await mount(
      <ControlledRangePicker />,
    )

    await click(document.querySelector("[data-slot='date-range-picker-trigger']"))
    await click(document.querySelector("[data-testid='calendar-select-start']"))
    await click(document.querySelector("[data-testid='calendar-select-end']"))

    const hasCompleteRange = onValueChange.mock.calls.some(([arg]) => {
      return arg?.from instanceof Date && arg?.to instanceof Date
    })

    expect(hasCompleteRange).toBe(true)
  })

  it('supports custom trigger and opens calendar', async () => {
    await mount(
      <DateRangePicker
        value={undefined}
        onValueChange={() => {}}
        trigger={
          <button type='button' data-testid='custom-date-range-trigger'>
            Open Custom Range Trigger
          </button>
        }
      />,
    )

    await click(document.querySelector("[data-testid='custom-date-range-trigger']"))

    expect(document.querySelector("[data-slot='calendar']")).toBeTruthy()
  })
})
