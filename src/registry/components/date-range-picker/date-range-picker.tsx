'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { RiCalendarLine } from '@remixicon/react'
import type { DateRange } from 'react-day-picker'

import type { DateRangePickerProps } from './date-range-picker.types'
import { cn } from '@/registry/lib/utils'
import { Button } from '@/registry/ui/button'
import { Calendar } from '@/registry/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/ui/popover'

function getRangeLabel(value: DateRange | undefined, placeholder: string) {
  if (!value?.from) {
    return placeholder
  }

  if (!value.to) {
    return `${format(value.from, 'LLL dd, y')} - ...`
  }

  return `${format(value.from, 'LLL dd, y')} - ${format(value.to, 'LLL dd, y')}`
}

function DateRangePicker({
  value,
  onValueChange,
  placeholder = 'Pick a date range',
  closeOnSelect = false,
  disabled,
  className,
  triggerClassName,
  numberOfMonths = 2,
  calendarProps,
  popoverContentProps,
  trigger,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  const { className: popoverContentClassName, ...restPopoverContentProps } =
    popoverContentProps ?? {}

  const triggerLabel = getRangeLabel(value, placeholder)
  const defaultTrigger = (
    <Button
      variant="outline"
      className={cn(
        'w-full justify-start text-left font-normal',
        !value?.from && 'text-muted-foreground',
        triggerClassName,
      )}
    >
      <RiCalendarLine className="size-3.5 shrink-0" />
      <span className="truncate">{triggerLabel}</span>
    </Button>
  )

  const handleSelect = React.useCallback(
    (nextValue: DateRange | undefined) => {
      onValueChange(nextValue)
      if (closeOnSelect && nextValue?.from && nextValue.to) {
        setOpen(false)
      }
    },
    [closeOnSelect, onValueChange],
  )

  return (
    <div data-slot="date-range-picker" className={cn('w-full', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          data-slot="date-range-picker-trigger"
          disabled={disabled}
          render={trigger || defaultTrigger}
        />

        <PopoverContent
          data-slot="date-range-picker-content"
          align="start"
          className={cn('w-auto p-0', popoverContentClassName)}
          {...restPopoverContentProps}
        >
          <Calendar
            {...calendarProps}
            mode="range"
            numberOfMonths={numberOfMonths}
            selected={value}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DateRangePicker }
