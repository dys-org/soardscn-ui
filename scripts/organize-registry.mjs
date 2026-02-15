import { promises as fs } from 'node:fs'
import path from 'node:path'

const outputRoot = path.resolve(process.cwd(), 'public/r')

const TYPE_TO_DIR = {
  'registry:ui': 'ui',
  'registry:lib': 'lib',
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function fileExists(target) {
  try {
    await fs.stat(target)
    return true
  } catch {
    return false
  }
}

async function main() {
  if (!(await fileExists(outputRoot))) {
    throw new Error(`Missing output directory: ${outputRoot}. Run shadcn build first.`)
  }

  const uiDir = path.join(outputRoot, 'ui')
  const libDir = path.join(outputRoot, 'lib')

  // Clear grouped output so the script is idempotent and stale files do not linger.
  await fs.rm(uiDir, { recursive: true, force: true })
  await fs.rm(libDir, { recursive: true, force: true })
  await ensureDir(uiDir)
  await ensureDir(libDir)

  const entries = await fs.readdir(outputRoot, { withFileTypes: true })
  const flatJsonFiles = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith('.json'),
  )

  for (const file of flatJsonFiles) {
    const source = path.join(outputRoot, file.name)
    const raw = await fs.readFile(source, 'utf8')

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (error) {
      throw new Error(`Invalid JSON in ${source}: ${String(error)}`)
    }

    const type = parsed?.type
    const dirName = TYPE_TO_DIR[type]

    if (!dirName) {
      continue
    }

    const destination = path.join(outputRoot, dirName, file.name)
    await fs.rename(source, destination)
  }

  console.log('Registry output organized into public/r/ui and public/r/lib')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
