import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

const envParsed = envSchema.safeParse(process.env)

if (envParsed.success === false) {
  console.log('⚠️ Invalid environment variables.', envParsed.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = envParsed.data
