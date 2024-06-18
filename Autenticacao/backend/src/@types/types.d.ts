import { z } from 'zod'

export type ZodGerarType<T> = z.infer<T>
