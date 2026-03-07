import { act, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { format } from 'date-fns'
import type { Root } from 'react-dom/client'
import type { ReactNode } from 'react'

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
    await mount(<DatePicker value={undefined} onValueChange={() => {}} />)

    expect(document.querySelector("[data-slot='date-picker']")).toBeTruthy()
    expect(
      document.querySelector("[data-slot='date-picker-trigger']"),
    ).toBeTruthy()
    expect(document.body.textContent).toContain('Pick a date')
  })

  it('renders formatted selected value', async () => {
    const value = new Date(2024, 0, 15)

    await mount(<DatePicker value={value} onValueChange={() => {}} />)

    expect(document.body.textContent).toContain(format(value, 'PPP'))
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

    await mount(<ControlledPicker />)

    await click(document.querySelector("[data-slot='date-picker-trigger']"))
    await click(document.querySelector("[data-testid='calendar-select-date']"))

    expect(onValueChange).toHaveBeenCalled()
    const lastCall = onValueChange.mock.calls.at(-1)?.[0]
    expect(lastCall).toBeInstanceOf(Date)
  })

  it('supports custom trigger and opens calendar', async () => {
    await mount(
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

    await click(document.querySelector("[data-testid='custom-date-trigger']"))

    expect(document.querySelector("[data-slot='calendar']")).toBeTruthy()
  })
})
