/**
 * @description Tipagem dos tipos de erros recebidos pelo servidor
 */
export type ValidsTypeError =
  | 'Erro de autenticação'
  | 'Erro de autorização'
  | 'Erro credenciais inválidas'
  | 'Erro token de acesso invalido'
  | 'Erro nos dados enviados'
  | 'Erro na comunicação do servidor'
  | 'Erro na comunicação com servidor de terceiros'
  | 'Erro nas regras de negócios'
  | 'Erro do Servidor Interno'
  | 'Erro na comunicação com banco de dados'
  | 'Erro lógica não implementada'
  | 'Erro serviço requisitado inconsistente'
  | 'Erro serviço indisponível'
  | 'Erro tempo limite de resposta atingido'
  | 'Erro versão HTTP não suportada'
  | 'Erro solicitação inválida'
  | 'Erro página não encontrada'
  | 'Erro requisição negada'
  | 'Erro tempo de solicitação esgotado'
  | 'Erro solicitação conflituosa'
  | 'Erro comunicação perdida'
  | 'Erro ao comunicar com API externa'
  | 'teste'

export interface CustomErrType extends Error {
  statusCode: number
  message: string
  typeError?: ValidsTypeError
  local?: string
}