import { config } from 'dotenv'

import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

export default <Environment>{
  name: 'knex',
  async setup() {
    const filename = `test-${randomUUID()}.db`
    const filepath = path.join('db', filename)

    await fs.promises.writeFile(filepath, '')

    process.env.DATABASE_URL = filepath

    execSync('npm run knex -- migrate:latest')

    return {
      async teardown() {
        try {
          await fs.promises.unlink(filepath)
        } catch {
          await fs.promises.rm(filepath, {
            force: true,
            maxRetries: 2,
            retryDelay: 500,
          })
        }
      },
    }
  },
}
