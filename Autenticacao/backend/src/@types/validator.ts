import { CustomError } from '@/errors/gerarErros'
import { z } from 'zod'

export function validator(schema: z.ZodTypeAny, dados: unknown) {
  // VALIDAR DADOS
  const validator = schema.safeParse(dados)

  // ERRO EM CASO DE DADOS INVÁLIDOS
  if (validator.success === false) {
    console.log(validator.error)

    throw new CustomError({
      message: `${validator.error.errors[0].message} / ZodError`,
      statusCode: 409,
    })
  }
  return validator.data
}
