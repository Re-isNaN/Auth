import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().default('JWT_KEY_SECRET'),
  COOKIE_SECRET: z.string().default('COOKIE_KEY_SECRET'),
  SALT_CRIPTO: z.coerce.number().default(14),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Variaveis de ambiente inválidas', _env.error.format())

  throw new Error('Variaveis de ambiente inválidas')
}

export const env = _env.data
