import { afterEach, describe, expect, it } from 'vitest'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import type { Root } from 'react-dom/client'
import type { ReactNode } from 'react'

import { AlertDialog, AlertDialogTrigger } from '@/registry/ui/alert-dialog'
import { Badge } from '@/registry/ui/badge'
import { Button } from '@/registry/ui/button'
import { Card, CardContent, CardTitle } from '@/registry/ui/card'
import { Combobox, ComboboxInput } from '@/registry/ui/combobox'
import { DropdownMenu, DropdownMenuTrigger } from '@/registry/ui/dropdown-menu'
import { Field, FieldGroup, FieldLabel } from '@/registry/ui/field'
import { InputGroup, InputGroupInput } from '@/registry/ui/input-group'
import { Input } from '@/registry/ui/input'
import { Label } from '@/registry/ui/label'
import { Select, SelectTrigger, SelectValue } from '@/registry/ui/select'
import { Separator } from '@/registry/ui/separator'
import { Textarea } from '@/registry/ui/textarea'

describe('registry ui render smoke tests', () => {
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

  afterEach(async () => {
    await act(async () => {
      root?.unmount()
    })
    container?.remove()
    root = null
    container = null
  })

  it('renders alert-dialog', async () => {
    await mount(
      <AlertDialog>
        <AlertDialogTrigger>Open dialog</AlertDialogTrigger>
      </AlertDialog>,
    )

    expect(
      document.querySelector('[data-slot="alert-dialog-trigger"]'),
    ).toBeTruthy()
  })

  it('renders badge', async () => {
    await mount(<Badge>Status</Badge>)
    expect(document.body.textContent).toContain('Status')
  })

  it('renders button', async () => {
    await mount(<Button>Save</Button>)
    expect(document.querySelector('[data-slot="button"]')).toBeTruthy()
  })

  it('renders card', async () => {
    await mount(
      <Card>
        <CardTitle>Title</CardTitle>
        <CardContent>Content</CardContent>
      </Card>,
    )
    expect(document.querySelector('[data-slot="card"]')).toBeTruthy()
  })

  it('renders combobox', async () => {
    await mount(
      <Combobox items={['React', 'Vue']}>
        <ComboboxInput placeholder="Framework" />
      </Combobox>,
    )

    expect(document.querySelector('[data-slot="input-group"]')).toBeTruthy()
  })

  it('renders dropdown-menu', async () => {
    await mount(
      <DropdownMenu>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      </DropdownMenu>,
    )

    expect(
      document.querySelector('[data-slot="dropdown-menu-trigger"]'),
    ).toBeTruthy()
  })

  it('renders field', async () => {
    await mount(
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" />
        </Field>
      </FieldGroup>,
    )

    expect(document.querySelector('[data-slot="field-label"]')).toBeTruthy()
  })

  it('renders input-group', async () => {
    await mount(
      <InputGroup>
        <InputGroupInput aria-label="Group input" />
      </InputGroup>,
    )

    expect(
      document.querySelector('input[aria-label="Group input"]'),
    ).toBeTruthy()
  })

  it('renders input', async () => {
    await mount(<Input aria-label="Plain input" />)
    expect(
      document.querySelector('input[aria-label="Plain input"]'),
    ).toBeTruthy()
  })

  it('renders label', async () => {
    await mount(<Label htmlFor="email">Email</Label>)
    expect(document.querySelector('[data-slot="label"]')).toBeTruthy()
  })

  it('renders select', async () => {
    await mount(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose one" />
        </SelectTrigger>
      </Select>,
    )

    expect(document.querySelector('[data-slot="select-trigger"]')).toBeTruthy()
  })

  it('renders separator', async () => {
    await mount(<Separator />)
    expect(document.querySelector('[data-slot="separator"]')).toBeTruthy()
  })

  it('renders textarea', async () => {
    await mount(<Textarea aria-label="Description" />)
    expect(
      document.querySelector('textarea[aria-label="Description"]'),
    ).toBeTruthy()
  })
})
