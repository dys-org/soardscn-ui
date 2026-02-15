import { afterEach, describe, expect, it } from "vitest"
import { act, type ReactNode } from "react"
import { createRoot, type Root } from "react-dom/client"

import { MultiSelect } from "@/registry/enhanced/multi-select"

describe("enhanced multi-select render smoke test", () => {
  let root: Root | null = null
  let container: HTMLDivElement | null = null

  async function mount(ui: ReactNode) {
    container = document.createElement("div")
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

  it("renders grouped options with searchable trigger", async () => {
    await mount(
      <MultiSelect
        options={[
          {
            label: "Frontend",
            options: [
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
            ],
          },
        ]}
        defaultValue={["react"]}
      />,
    )

    expect(document.querySelector("[data-slot='multi-select']")).toBeTruthy()
    expect(document.querySelector("[data-slot='multi-select-status']")).toBeTruthy()
  })
})
