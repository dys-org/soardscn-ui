export type MultiSelectVariant = "neutral" | "success" | "warning" | "error"

export type MultiSelectDevice = "mobile" | "tablet" | "desktop"

export type MultiSelectOption = {
  label: string
  value: string
  disabled?: boolean
  keywords?: string[]
}

export type MultiSelectGroup = {
  label: string
  options: MultiSelectOption[]
}

export type MultiSelectOptions = MultiSelectOption[] | MultiSelectGroup[]

export type MultiSelectDeviceConfig = {
  maxVisibleSelected?: number
  singleLine?: boolean
}

export type MultiSelectResponsiveConfig = Partial<
  Record<MultiSelectDevice, MultiSelectDeviceConfig>
>
