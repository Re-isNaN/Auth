import authRepository from '@/api/repositories/auth/auth.repository'

import { CustomErrType, CustomError } from '@/errors/gerarErros'
import { TCredenciaisLogin } from './auth.tipagens'

async function login(credenciais: TCredenciaisLogin) {
  try {
    return await authRepository.login(credenciais)
  } catch (err) {
    const errorDef = err as CustomErrType

    const objectError = {
      message: errorDef.message || 'Erro ao realizar login',
      statusCode: errorDef.statusCode || 500,
      local: errorDef.local || 'services/login login()',
      typeError: errorDef.typeError || 'Erro nas regras de negócios',
    }

    throw new CustomError(objectError)
  }
}

async function inserirRefreshToken(refreshToken: string, id: string) {
  try {
    await authRepository.inserirRefreshToken(refreshToken, id)
  } catch (err) {
    const errorDef = err as CustomErrType

    const objectError = {
      message: errorDef.message || 'Erro ao inserir refresh',
      statusCode: errorDef.statusCode || 500,
      local: errorDef.local || 'services/auth inserirRefreshToken()',
      typeError: errorDef.typeError || 'Erro nas regras de negócios',
    }

    throw new CustomError(objectError)
  }
}

async function obterToken(uuid: string) {
  try {
    const infoUsuarioRefresh = await authRepository.obterToken(uuid)

    return infoUsuarioRefresh
  } catch (err) {
    const errorDef = err as CustomErrType

    const objectError = {
      message: errorDef.message || 'Erro ao obter refresh',
      statusCode: errorDef.statusCode || 500,
      local: errorDef.local || 'services/auth obterRefreshToken()',
      typeError: errorDef.typeError || 'Erro nas regras de negócios',
    }

    throw new CustomError(objectError)
  }
}

async function excluirRefreshToken(id: string) {
  try {
    await authRepository.excluirRefreshToken(id)
  } catch (err) {
    const errorDef = err as CustomErrType

    const objectError = {
      message: errorDef.message || 'Erro ao excluir refresh',
      statusCode: errorDef.statusCode || 500,
      local: errorDef.local || 'services/auth excluirRefreshToken()',
      typeError: errorDef.typeError || 'Erro nas regras de negócios',
    }

    throw new CustomError(objectError)
  }
}

export default {
  login,
  inserirRefreshToken,
  obterToken,
  excluirRefreshToken,
}
