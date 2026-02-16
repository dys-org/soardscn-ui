import type { ComponentProps, ReactElement } from 'react'

import { Calendar } from '@/registry/ui/calendar'
import { PopoverContent } from '@/registry/ui/popover'

export type DatePickerProps = {
  value: Date | undefined
  onValueChange: (value: Date | undefined) => void
  placeholder?: string
  closeOnSelect?: boolean
  disabled?: boolean
  className?: string
  triggerClassName?: string
  calendarProps?: Omit<
    ComponentProps<typeof Calendar>,
    'mode' | 'selected' | 'onSelect'
  >
  popoverContentProps?: Partial<ComponentProps<typeof PopoverContent>>
  trigger?: ReactElement
}
