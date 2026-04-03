#!/usr/bin/env node
import { runCLI as runCliEntry } from './runCLI'
export { runCLI } from './runCLI'

if (require.main === module) {
  void (async () => {
    try {
      await runCliEntry()
    } catch (err) {
      console.error('tsoa cli error:\n', err)
      process.exit(1)
    }
  })()
}
