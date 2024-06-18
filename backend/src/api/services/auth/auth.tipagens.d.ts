import { loginSchemas } from '@/api/controllers/auth/auth.schemas'
import { z } from 'zod'

export type TCredenciaisLogin = z.infer<typeof loginSchemas.bodySchema>
