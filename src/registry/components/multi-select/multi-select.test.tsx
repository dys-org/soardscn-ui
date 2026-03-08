import { render } from 'vitest-browser-react'
import { describe, expect, it } from 'vitest'

import { MultiSelect } from '@/registry/components/multi-select'

describe('component multi-select render smoke test', () => {
  it('renders grouped options with searchable trigger', async () => {
    const screen = render(
      <MultiSelect
        options={[
          {
            label: 'Frontend',
            options: [
              { label: 'React', value: 'react' },
              { label: 'Vue', value: 'vue' },
            ],
          },
        ]}
        defaultValue={['react']}
      />,
    )

    await expect.element(screen.getByText('React')).toBeVisible()
  })
})
