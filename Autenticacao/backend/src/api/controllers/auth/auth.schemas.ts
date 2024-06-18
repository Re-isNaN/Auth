import { errMessageRequired } from '@/errors/messagemErros'
import { z } from 'zod'

export const loginSchemas = {
  bodySchema: z.object({
    nome: z.string({ required_error: `nome ${errMessageRequired}` }),
    senha: z.string({ required_error: `senha ${errMessageRequired}` }),
  }),
}
