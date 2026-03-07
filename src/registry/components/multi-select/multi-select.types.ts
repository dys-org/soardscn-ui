export type MultiSelectVariant = 'neutral' | 'success' | 'warning' | 'error'

export type MultiSelectDevice = 'mobile' | 'tablet' | 'desktop'

export type MultiSelectOption = {
  label: string
  value: string
  disabled?: boolean
  keywords?: Array<string>
}

export type MultiSelectGroup = {
  label: string
  options: Array<MultiSelectOption>
}

export type MultiSelectOptions =
  | Array<MultiSelectOption>
  | Array<MultiSelectGroup>

export type MultiSelectDeviceConfig = {
  maxVisibleSelected?: number
  singleLine?: boolean
}

export type MultiSelectResponsiveConfig = Partial<
  Record<MultiSelectDevice, MultiSelectDeviceConfig>
>
