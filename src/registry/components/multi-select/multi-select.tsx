import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  useComboboxAnchor,
} from "@/registry/ui/combobox"

import type {
  MultiSelectDevice,
  MultiSelectDeviceConfig,
  MultiSelectGroup,
  MultiSelectOption,
  MultiSelectOptions,
  MultiSelectResponsiveConfig,
  MultiSelectVariant,
} from "./multi-select.types"

const multiSelectTriggerVariants = cva(
  "border-input bg-input/20 dark:bg-input/30 focus-within:border-ring focus-within:ring-ring/30 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive dark:has-aria-invalid:border-destructive/50 flex min-h-7 w-full items-center gap-1 rounded-md border px-2 py-0.5 text-xs/relaxed transition-colors focus-within:ring-2 has-aria-invalid:ring-2",
  {
    variants: {
      variant: {
        neutral: "",
        success:
          "border-emerald-500/40 focus-within:ring-emerald-500/25 focus-within:border-emerald-500/60",
        warning:
          "border-amber-500/40 focus-within:ring-amber-500/25 focus-within:border-amber-500/60",
        error:
          "border-destructive/60 focus-within:ring-destructive/25 focus-within:border-destructive/70",
      },
      singleLine: {
        true: "flex-nowrap overflow-hidden",
        false: "flex-wrap",
      },
    },
    defaultVariants: {
      variant: "neutral",
      singleLine: false,
    },
  },
)

const badgeToneClasses: Record<MultiSelectVariant, string> = {
  neutral: "",
  success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  warning: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  error: "bg-destructive/15 text-destructive",
}

const responsiveDefaults: Record<MultiSelectDevice, MultiSelectDeviceConfig> = {
  mobile: { maxVisibleSelected: 1, singleLine: true },
  tablet: { maxVisibleSelected: 2, singleLine: true },
  desktop: { maxVisibleSelected: 3, singleLine: false },
}

type MultiSelectProps = {
  options: MultiSelectOptions
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  searchable?: boolean
  variant?: MultiSelectVariant
  disabled?: boolean
  maxVisibleSelected?: number
  singleLine?: boolean
  responsive?: boolean
  responsiveConfig?: MultiSelectResponsiveConfig
  emptyText?: string
  overflowLabel?: (count: number) => string
  ariaLabel?: string
  className?: string
}

function isGroupedOptions(
  options: MultiSelectOptions,
): options is MultiSelectGroup[] {
  const first = options[0] as MultiSelectOption | MultiSelectGroup | undefined
  return Boolean(first && "options" in first)
}

function getDevice(): MultiSelectDevice {
  if (typeof window === "undefined") {
    return "desktop"
  }

  if (window.matchMedia("(max-width: 639px)").matches) {
    return "mobile"
  }

  if (window.matchMedia("(max-width: 1023px)").matches) {
    return "tablet"
  }

  return "desktop"
}

function useResponsiveDevice(enabled: boolean): MultiSelectDevice {
  const [device, setDevice] = React.useState<MultiSelectDevice>(getDevice)

  React.useEffect(() => {
    if (!enabled) {
      return
    }

    const onResize = () => setDevice(getDevice())
    window.addEventListener("resize", onResize)

    return () => window.removeEventListener("resize", onResize)
  }, [enabled])

  return enabled ? device : "desktop"
}

function MultiSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select options",
  searchable = true,
  variant = "neutral",
  disabled = false,
  maxVisibleSelected = 3,
  singleLine = false,
  responsive = true,
  responsiveConfig,
  emptyText = "No options found.",
  overflowLabel,
  ariaLabel = "Multi-select options",
  className,
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    defaultValue ?? [],
  )
  const selectedValues = value ?? internalValue
  const [query, setQuery] = React.useState("")
  const anchorRef = useComboboxAnchor()

  const device = useResponsiveDevice(responsive)
  const resolvedConfig = React.useMemo(() => {
    const defaults = responsiveDefaults[device]
    const overrides = responsiveConfig?.[device] ?? {}

    return {
      maxVisibleSelected: overrides.maxVisibleSelected ?? defaults.maxVisibleSelected ?? maxVisibleSelected,
      singleLine: overrides.singleLine ?? defaults.singleLine ?? singleLine,
    }
  }, [device, maxVisibleSelected, responsiveConfig, singleLine])

  const normalizedGroups = React.useMemo<MultiSelectGroup[]>(() => {
    if (isGroupedOptions(options)) {
      return options
    }

    return [
      {
        label: "",
        options,
      },
    ]
  }, [options])

  const optionByValue = React.useMemo(() => {
    return new Map(
      normalizedGroups.flatMap((group) =>
        group.options.map((option) => [option.value, option]),
      ),
    )
  }, [normalizedGroups])

  const filteredGroups = React.useMemo(() => {
    if (!searchable || !query.trim()) {
      return normalizedGroups
    }

    const needle = query.toLowerCase()
    return normalizedGroups
      .map((group) => ({
        ...group,
        options: group.options.filter((option) => {
          const searchTarget = [
            option.label,
            option.value,
            ...(option.keywords ?? []),
          ]
            .join(" ")
            .toLowerCase()

          return searchTarget.includes(needle)
        }),
      }))
      .filter((group) => group.options.length > 0)
  }, [normalizedGroups, query, searchable])

  const filteredValues = React.useMemo(
    () =>
      filteredGroups.flatMap((group) => group.options.map((option) => option.value)),
    [filteredGroups],
  )

  const selectedOptions = React.useMemo(
    () =>
      selectedValues
        .map((selectedValue) => optionByValue.get(selectedValue))
        .filter((option): option is MultiSelectOption => Boolean(option)),
    [optionByValue, selectedValues],
  )

  const visibleSelected = selectedOptions.slice(
    0,
    Math.max(0, resolvedConfig.maxVisibleSelected),
  )
  const hiddenCount = Math.max(
    0,
    selectedOptions.length - visibleSelected.length,
  )

  const updateSelectedValues = React.useCallback(
    (nextValue: string[]) => {
      if (value === undefined) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [onValueChange, value],
  )

  const removeValue = React.useCallback(
    (valueToRemove: string) => {
      updateSelectedValues(
        selectedValues.filter((selectedValue) => selectedValue !== valueToRemove),
      )
    },
    [selectedValues, updateSelectedValues],
  )

  const handleValueChange = React.useCallback(
    (nextValue: string[] | string | null) => {
      if (Array.isArray(nextValue)) {
        updateSelectedValues(nextValue)
        return
      }

      if (typeof nextValue === "string") {
        updateSelectedValues([nextValue])
        return
      }

      updateSelectedValues([])
    },
    [updateSelectedValues],
  )

  return (
    <div data-slot="multi-select-root" className="space-y-1">
      <Combobox
        multiple
        disabled={disabled}
        items={filteredValues}
        value={selectedValues}
        onValueChange={handleValueChange}
        onInputValueChange={setQuery}
      >
        <ComboboxChips
          ref={anchorRef}
          data-slot="multi-select"
          className={cn(
            multiSelectTriggerVariants({
              variant,
              singleLine: resolvedConfig.singleLine,
            }),
            className,
          )}
        >
          {visibleSelected.map((selectedOption) => (
            <Badge
              key={selectedOption.value}
              variant="secondary"
              className={cn(
                "max-w-full gap-1 truncate",
                badgeToneClasses[variant],
                resolvedConfig.singleLine && "shrink-0",
              )}
            >
              <span className="truncate">{selectedOption.label}</span>
              <button
                type="button"
                className="opacity-60 transition-opacity hover:opacity-100"
                onClick={(event) => {
                  event.stopPropagation()
                  removeValue(selectedOption.value)
                }}
                aria-label={`Remove ${selectedOption.label}`}
              >
                x
              </button>
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <Badge
              variant="outline"
              className={cn("shrink-0", badgeToneClasses[variant])}
            >
              {overflowLabel ? overflowLabel(hiddenCount) : `+${hiddenCount}`}
            </Badge>
          )}

          <ComboboxChipsInput
            aria-label={ariaLabel}
            className={cn(
              "min-w-14 flex-1 bg-transparent outline-none",
              !searchable && "w-0 min-w-0 p-0 opacity-0",
            )}
            placeholder={selectedOptions.length ? undefined : placeholder}
            readOnly={!searchable}
          />
          <ComboboxTrigger className="ml-auto shrink-0" />
        </ComboboxChips>

        <ComboboxContent anchor={anchorRef} className="w-(--anchor-width)">
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          <ComboboxList>
            {filteredGroups.map((group, index) => (
              <ComboboxGroup
                key={group.label || `group-${index}`}
                items={group.options.map((option) => option.value)}
              >
                {group.label ? <ComboboxLabel>{group.label}</ComboboxLabel> : null}
                {group.options.map((option) => (
                  <ComboboxItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    <span className="truncate">{option.label}</span>
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <span aria-live="polite" className="sr-only" data-slot="multi-select-status">
        {selectedValues.length} selected
      </span>
    </div>
  )
}

export { MultiSelect }
export type { MultiSelectProps }
