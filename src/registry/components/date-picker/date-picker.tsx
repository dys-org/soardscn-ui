'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { RiCalendarLine } from '@remixicon/react'

import { cn } from '@/registry/lib/utils'
import { Button } from '@/registry/ui/button'
import { Calendar } from '@/registry/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/ui/popover'

import type { DatePickerProps } from './date-picker.types'

function DatePicker({
  value,
  onValueChange,
  placeholder = 'Pick a date',
  closeOnSelect = false,
  disabled,
  className,
  triggerClassName,
  calendarProps,
  popoverContentProps,
  trigger,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const { className: popoverContentClassName, ...restPopoverContentProps } =
    popoverContentProps ?? {}

  const triggerLabel = value ? format(value, 'PPP') : placeholder
  const defaultTrigger = (
    <Button
      variant='outline'
      className={cn(
        'w-full justify-start text-left font-normal',
        !value && 'text-muted-foreground',
        triggerClassName,
      )}
    >
      <RiCalendarLine className='size-3.5 shrink-0' />
      <span className='truncate'>{triggerLabel}</span>
    </Button>
  )

  const handleSelect = React.useCallback(
    (nextValue: Date | undefined) => {
      onValueChange(nextValue)
      if (closeOnSelect && nextValue) {
        setOpen(false)
      }
    },
    [closeOnSelect, onValueChange],
  )

  return (
    <div data-slot='date-picker' className={cn('w-full', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          data-slot='date-picker-trigger'
          disabled={disabled}
          render={trigger || defaultTrigger}
        />

        <PopoverContent
          data-slot='date-picker-content'
          align='start'
          className={cn('w-auto p-0', popoverContentClassName)}
          {...restPopoverContentProps}
        >
          <Calendar
            {...calendarProps}
            mode='single'
            selected={value}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DatePicker }
