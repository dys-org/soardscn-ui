import type { ComponentProps, ReactElement } from 'react'
import type { DateRange } from 'react-day-picker'

import { Calendar } from '@/registry/ui/calendar'
import { PopoverContent } from '@/registry/ui/popover'

export type DateRangePickerProps = {
  value: DateRange | undefined
  onValueChange: (value: DateRange | undefined) => void
  placeholder?: string
  closeOnSelect?: boolean
  disabled?: boolean
  className?: string
  triggerClassName?: string
  numberOfMonths?: number
  calendarProps?: Omit<
    ComponentProps<typeof Calendar>,
    'mode' | 'selected' | 'onSelect' | 'numberOfMonths'
  >
  popoverContentProps?: Partial<ComponentProps<typeof PopoverContent>>
  trigger?: ReactElement
}
