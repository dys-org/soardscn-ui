import { render } from 'vitest-browser-react'
import { describe, expect, it } from 'vitest'

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
  it('renders alert-dialog', async () => {
    const screen = render(
      <AlertDialog>
        <AlertDialogTrigger>Open dialog</AlertDialogTrigger>
      </AlertDialog>,
    )

    await expect
      .element(screen.getByRole('button', { name: 'Open dialog' }))
      .toBeVisible()
  })

  it('renders badge', async () => {
    const screen = render(<Badge>Status</Badge>)
    await expect.element(screen.getByText('Status')).toBeVisible()
  })

  it('renders button', async () => {
    const screen = render(<Button>Save</Button>)
    await expect
      .element(screen.getByRole('button', { name: 'Save' }))
      .toBeVisible()
  })

  it('renders card', async () => {
    const screen = render(
      <Card>
        <CardTitle>Title</CardTitle>
        <CardContent>Content</CardContent>
      </Card>,
    )
    await expect.element(screen.getByText('Title')).toBeVisible()
    await expect.element(screen.getByText('Content')).toBeVisible()
  })

  it('renders combobox', async () => {
    const screen = render(
      <Combobox items={['React', 'Vue']}>
        <ComboboxInput placeholder="Framework" />
      </Combobox>,
    )

    await expect.element(screen.getByPlaceholder('Framework')).toBeVisible()
  })

  it('renders dropdown-menu', async () => {
    const screen = render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      </DropdownMenu>,
    )

    await expect
      .element(screen.getByRole('button', { name: 'Open menu' }))
      .toBeVisible()
  })

  it('renders field', async () => {
    const screen = render(
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" />
        </Field>
      </FieldGroup>,
    )

    await expect.element(screen.getByText('Name')).toBeVisible()
  })

  it('renders input-group', async () => {
    const screen = render(
      <InputGroup>
        <InputGroupInput aria-label="Group input" />
      </InputGroup>,
    )

    await expect
      .element(screen.getByRole('textbox', { name: 'Group input' }))
      .toBeVisible()
  })

  it('renders input', async () => {
    const screen = render(<Input aria-label="Plain input" />)
    await expect
      .element(screen.getByRole('textbox', { name: 'Plain input' }))
      .toBeVisible()
  })

  it('renders label', async () => {
    const screen = render(<Label htmlFor="email">Email</Label>)
    await expect.element(screen.getByText('Email')).toBeVisible()
  })

  it('renders select', async () => {
    const screen = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose one" />
        </SelectTrigger>
      </Select>,
    )

    await expect.element(screen.getByText('Choose one')).toBeVisible()
  })

  it('renders separator', async () => {
    const screen = render(<Separator />)
    await expect.element(screen.getByRole('separator')).toBeVisible()
  })

  it('renders textarea', async () => {
    const screen = render(<Textarea aria-label="Description" />)
    await expect
      .element(screen.getByRole('textbox', { name: 'Description' }))
      .toBeVisible()
  })
})
