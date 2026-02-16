'use client'

import * as React from 'react'

import { Example, ExampleWrapper } from '@/app-components/example'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/registry/ui/alert-dialog'
import { Badge } from '@/registry/ui/badge'
import { Button } from '@/registry/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/registry/ui/combobox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'
import { Field, FieldGroup, FieldLabel } from '@/registry/ui/field'
import { Input } from '@/registry/ui/input'
import { DatePicker } from '@/registry/components/date-picker'
import { DateRangePicker } from '@/registry/components/date-range-picker'
import { MultiSelect } from '@/registry/components/multi-select'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/ui/select'
import { Textarea } from '@/registry/ui/textarea'
import {
  RiAddLine,
  RiBluetoothLine,
  RiMore2Line,
  RiFileLine,
  RiFolderLine,
  RiFolderOpenLine,
  RiCodeLine,
  RiMoreLine,
  RiSearchLine,
  RiSaveLine,
  RiDownloadLine,
  RiEyeLine,
  RiLayoutLine,
  RiPaletteLine,
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
  RiUserLine,
  RiBankCardLine,
  RiSettingsLine,
  RiKeyboardLine,
  RiTranslate,
  RiNotificationLine,
  RiMailLine,
  RiShieldLine,
  RiQuestionLine,
  RiFileTextLine,
  RiLogoutBoxLine,
  RiCalendarLine,
} from '@remixicon/react'
import type { DateRange } from 'react-day-picker'

export function ComponentExample() {
  return (
    <ExampleWrapper className="mx-0 max-w-none min-h-0 content-start p-0 pt-0 sm:p-0 lg:p-0">
      <CardExample />
      <FormExample />
    </ExampleWrapper>
  )
}

function CardExample() {
  return (
    <Example title="Card" className="items-center justify-center">
      <Card className="relative w-full max-w-sm overflow-hidden pt-0">
        <div className="bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
        />
        <CardHeader>
          <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
          <CardDescription>
            Switch to the improved way to explore your data, with natural
            language. Monitoring will no longer be available on the Pro plan in
            November, 2025
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger render={<Button />}>
              <RiAddLine data-icon="inline-start" />
              Show Dialog
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <RiBluetoothLine />
                </AlertDialogMedia>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this
                  device?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Badge variant="secondary" className="ml-auto">
            Warning
          </Badge>
        </CardFooter>
      </Card>
    </Example>
  )
}

const frameworks = [
  'Next.js',
  'SvelteKit',
  'Nuxt.js',
  'Remix',
  'Astro',
] as const

const roleItems = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Manager', value: 'manager' },
  { label: 'Other', value: 'other' },
]

const skillGroups = [
  {
    label: 'Frontend',
    options: [
      { label: 'React', value: 'react' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Tailwind CSS', value: 'tailwind' },
    ],
  },
  {
    label: 'Backend',
    options: [
      { label: 'Node.js', value: 'nodejs' },
      { label: 'PostgreSQL', value: 'postgres' },
      { label: 'Redis', value: 'redis' },
    ],
  },
]

function FormExample() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })
  const [theme, setTheme] = React.useState('light')
  const [skills, setSkills] = React.useState<string[]>(['react', 'typescript'])
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
  const [deliveryWindow, setDeliveryWindow] = React.useState<
    DateRange | undefined
  >(undefined)

  return (
    <Example title="Form">
      <div className="grid w-full gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Please fill in your details below</CardDescription>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon" />}
                >
                  <RiMore2Line />
                  <span className="sr-only">More options</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>File</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <RiFileLine />
                      New File
                      <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RiFolderLine />
                      New Folder
                      <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <RiFolderOpenLine />
                        Open Recent
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>
                              Recent Projects
                            </DropdownMenuLabel>
                            <DropdownMenuItem>
                              <RiCodeLine />
                              Project Alpha
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RiCodeLine />
                              Project Beta
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <RiMoreLine />
                                More Projects
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem>
                                    <RiCodeLine />
                                    Project Gamma
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <RiCodeLine />
                                    Project Delta
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <RiSearchLine />
                              Browse...
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <RiSaveLine />
                      Save
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RiDownloadLine />
                      Export
                      <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>View</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          email: checked === true,
                        })
                      }
                    >
                      <RiEyeLine />
                      Show Sidebar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={notifications.sms}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          sms: checked === true,
                        })
                      }
                    >
                      <RiLayoutLine />
                      Show Status Bar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <RiPaletteLine />
                        Theme
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                            <DropdownMenuRadioGroup
                              value={theme}
                              onValueChange={setTheme}
                            >
                              <DropdownMenuRadioItem value="light">
                                <RiSunLine />
                                Light
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="dark">
                                <RiMoonLine />
                                Dark
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="system">
                                <RiComputerLine />
                                System
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <RiUserLine />
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RiBankCardLine />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <RiSettingsLine />
                        Settings
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <RiKeyboardLine />
                              Keyboard Shortcuts
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RiTranslate />
                              Language
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <RiNotificationLine />
                                Notifications
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                      Notification Types
                                    </DropdownMenuLabel>
                                    <DropdownMenuCheckboxItem
                                      checked={notifications.push}
                                      onCheckedChange={(checked) =>
                                        setNotifications({
                                          ...notifications,
                                          push: checked === true,
                                        })
                                      }
                                    >
                                      <RiNotificationLine />
                                      Push Notifications
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                      checked={notifications.email}
                                      onCheckedChange={(checked) =>
                                        setNotifications({
                                          ...notifications,
                                          email: checked === true,
                                        })
                                      }
                                    >
                                      <RiMailLine />
                                      Email Notifications
                                    </DropdownMenuCheckboxItem>
                                  </DropdownMenuGroup>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <RiShieldLine />
                              Privacy & Security
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <RiQuestionLine />
                      Help & Support
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RiFileTextLine />
                      Documentation
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                      <RiLogoutBoxLine />
                      Sign Out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="small-form-name">Name</FieldLabel>
                    <Input
                      id="small-form-name"
                      placeholder="Enter your name"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="small-form-role">Role</FieldLabel>
                    <Select items={roleItems} defaultValue={null}>
                      <SelectTrigger id="small-form-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {roleItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="small-form-framework">
                    Framework
                  </FieldLabel>
                  <Combobox items={frameworks}>
                    <ComboboxInput
                      id="small-form-framework"
                      placeholder="Select a framework"
                      required
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
                <Field>
                  <FieldLabel htmlFor="small-form-skills">Skills</FieldLabel>
                  <MultiSelect
                    options={skillGroups}
                    value={skills}
                    onValueChange={setSkills}
                    variant="neutral"
                    maxVisibleSelected={2}
                    responsive
                    responsiveConfig={{
                      mobile: { maxVisibleSelected: 1, singleLine: true },
                      tablet: { maxVisibleSelected: 2, singleLine: true },
                      desktop: { maxVisibleSelected: 3, singleLine: false },
                    }}
                    placeholder="Select skills"
                    ariaLabel="Select skills"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="small-form-comments">
                    Comments
                  </FieldLabel>
                  <Textarea
                    id="small-form-comments"
                    placeholder="Add any additional comments"
                  />
                </Field>
                <Field orientation="horizontal">
                  <Button type="submit">Submit</Button>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Date Pickers</CardTitle>
            <CardDescription>
              Controlled single-date and range-date examples with default and
              custom triggers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Start date</FieldLabel>
                  <DatePicker
                    value={startDate}
                    onValueChange={setStartDate}
                    placeholder="Pick a start date"
                  />
                </Field>
                <Field>
                  <FieldLabel>Delivery window</FieldLabel>
                  <DateRangePicker
                    value={deliveryWindow}
                    onValueChange={setDeliveryWindow}
                    placeholder="Pick a date range"
                  />
                </Field>
                <Field>
                  <FieldLabel>Custom single trigger</FieldLabel>
                  <DatePicker
                    value={startDate}
                    onValueChange={setStartDate}
                    trigger={
                      <Button variant="outline">
                        <RiCalendarLine data-icon="inline-start" />
                        Choose date
                      </Button>
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel>Custom range trigger</FieldLabel>
                  <DateRangePicker
                    value={deliveryWindow}
                    onValueChange={setDeliveryWindow}
                    trigger={
                      <Button variant="outline">
                        <RiCalendarLine data-icon="inline-start" />
                        Choose range
                      </Button>
                    }
                  />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>MultiSelect Variants</CardTitle>
            <CardDescription>
              Compare validation/semantic tones for the component-level
              multi-select.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Success</FieldLabel>
                <MultiSelect
                  options={skillGroups}
                  value={skills}
                  onValueChange={setSkills}
                  variant="success"
                  maxVisibleSelected={2}
                  responsive
                  placeholder="Select successful skills"
                  ariaLabel="Select successful skills"
                />
              </Field>
              <Field>
                <FieldLabel>Warning</FieldLabel>
                <MultiSelect
                  options={skillGroups}
                  value={skills}
                  onValueChange={setSkills}
                  variant="warning"
                  maxVisibleSelected={2}
                  responsive
                  placeholder="Select warning skills"
                  ariaLabel="Select warning skills"
                />
              </Field>
              <Field>
                <FieldLabel>Error</FieldLabel>
                <MultiSelect
                  options={skillGroups}
                  value={skills}
                  onValueChange={setSkills}
                  variant="error"
                  maxVisibleSelected={2}
                  responsive
                  placeholder="Select error skills"
                  ariaLabel="Select error skills"
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </Example>
  )
}
