import { ValidsTypeError } from './types'

export interface CustomErrType extends Error {
  statusCode: number
  message: string
  typeError?: ValidsTypeError
  local?: string
}

interface ObjectErrorType {
  message: string
  statusCode: number
  local?: string
  typeError?: ValidsTypeError
}

export class CustomError extends Error {
  name: string
  statusCode: number
  local?: string
  typeError?: ValidsTypeError

  constructor(objectError: ObjectErrorType) {
    super(objectError.message)
    this.name = 'CustomError'
    this.statusCode = objectError.statusCode || 500
    this.local = objectError.local

    if (!objectError.typeError) {
      if (objectError.statusCode >= 500) {
        const errorsHTTPCodes = {
          '500': 'Erro do Servidor Interno',
          '501': 'Erro lógica não implementada',
          '502': 'Erro serviço requisitado inconsistente',
          '503': 'Erro serviço indisponível',
          '504': 'Erro tempo limite de resposta atingido',
          '505': 'Erro versão HTTP não suportada',
        } as const

        const statusCodeKey =
          (objectError.statusCode.toString() as keyof typeof errorsHTTPCodes) ||
          Number

        this.typeError =
          errorsHTTPCodes[statusCodeKey] || 'Erro do Servidor Interno'
      } else if (objectError.statusCode >= 400) {
        const errorsHTTPCodes = {
          '400': 'Erro solicitação inválida',
          '401': 'Erro de autenticação',
          '403': 'Erro de autorização',
          '404': 'Erro página não encontrada',
          '406': 'Erro requisição negada',
          '408': 'Erro tempo de solicitação esgotado',
          '409': 'Erro solicitação conflituosa',
          '410': 'Erro comunicação perdida',
        } as const

        const statusCodeKey =
          (objectError.statusCode.toString() as keyof typeof errorsHTTPCodes) ||
          Number

        this.typeError =
          errorsHTTPCodes[statusCodeKey] || 'Erro solicitação inválida'
      } else {
        this.typeError = 'Erro do Servidor Interno'
      }
    } else {
      this.typeError = objectError.typeError
    }
  }
}
