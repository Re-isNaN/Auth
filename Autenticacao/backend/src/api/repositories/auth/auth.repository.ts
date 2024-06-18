import { CustomErrType, CustomError } from '@/errors/gerarErros'
import { readFile, writeFile } from 'fs/promises'

import bcrypt from 'bcrypt'

import { TCredenciaisLogin } from '@/api/services/auth/auth.tipagens'

interface IUsersDatabase {
  id: string
  nome: string
  senha: string
  autorizacao: string
  token: string
}

async function login(credenciais: TCredenciaisLogin) {
  try {
    const database: string = await readFile('src/database/protoDatabase.json', {
      encoding: 'utf-8',
    })

    const users: IUsersDatabase[] = JSON.parse(database)

    const usuarioDefinido =
      users.find((user) => user.nome === credenciais.nome) ??
      (() => {
        throw new CustomError({
          message: 'Usuario inexistente',
          statusCode: 400,
          typeError: 'Erro solicitação conflituosa',
        })
      })()

    const validarSenha = await bcrypt.compare(
      credenciais.senha,
      usuarioDefinido.senha,
    )

    if (validarSenha) {
      return {
        id: usuarioDefinido.id,
        nome: usuarioDefinido.nome,
      }
    } else {
      throw new CustomError({
        message: 'Erro ao fazer login',
        statusCode: 401,
        typeError: 'Erro credenciais inválidas',
      })
    }
  } catch (err: unknown) {
    const errorDef = err as CustomErrType

    const objectError = {
      message: errorDef.message || 'Erro ao fazer login',
      statusCode: errorDef.statusCode || 502,
      local: errorDef.local || 'repositories/login login()',
      typeError: errorDef.typeError || 'Erro na comunicação com banco de dados',
    }

    throw new CustomError(objectError)
  }
}

async function inserirRefreshToken(refreshToken: string, id: string) {
  try {
    const database: string = await readFile('src/database/protoDatabase.json', {
      encoding: 'utf-8',
    })

    const users: IUsersDatabase[] = JSON.parse(database)

    const atualizarTokenUsuario: IUsersDatabase[] = users.map((user) => {
      if (user.id === id) {
        return { ...user, token: refreshToken }
      } else {
        return user
      }
    })

    await writeFile(
      'src/database/protoDatabase.json',
      JSON.stringify(atualizarTokenUsuario),
      'utf-8',
    )
  } catch (err) {
    const errorDef = err as CustomErrType

    const objectError = {
      message: errorDef.message || 'Erro ao fazer inserir token',
      statusCode: errorDef.statusCode || 502,
      local: errorDef.local || 'repositories/auth inserirRefreshToken()',
      typeError: errorDef.typeError || 'Erro na comunicação com banco de dados',
    }

    throw new CustomError(objectError)
  }
}

async function obterToken(id: string) {
  try {
    const database: string = await readFile('src/database/protoDatabase.json', {
      encoding: 'utf-8',
    })

    const users: IUsersDatabase[] = JSON.parse(database)

    const { token } =
      users.find((user) => user.id === id) ??
      (() => {
        throw new CustomError({
          message: 'Usuario Invalido',
          statusCode: 401,
          local: 'services/auth refreshToken()',
          typeError: 'Erro de autenticação',
        })
      })()

    return {
      token,
    }
  } catch (err) {
    const errorDef = err as CustomErrType

    const objectError = {
      message:
        errorDef.message ||
        'Erro ao obter token do usuario cadastrado no banco de dados',
      statusCode: errorDef.statusCode || 502,
      local: errorDef.local || 'repositories/auth obterToken()',
      typeError: errorDef.typeError || 'Erro na comunicação com banco de dados',
    }

    throw new CustomError(objectError)
  }
}

async function excluirRefreshToken(id: string) {
  try {
    const database: string = await readFile('src/database/protoDatabase.json', {
      encoding: 'utf-8',
    })

    const users: IUsersDatabase[] = JSON.parse(database)

    const excluirTokenUsuario: IUsersDatabase[] = users.map((user) => {
      if (user.id === id) {
        return { ...user, token: '' }
      } else {
        return user
      }
    })

    await writeFile(
      'src/database/protoDatabase.json',
      JSON.stringify(excluirTokenUsuario),
      'utf-8',
    )
  } catch (err) {
    const errorDef = err as CustomErrType

    const objectError = {
      message:
        errorDef.message ||
        'Erro ao inserir token  do usuario no banco de dados',
      statusCode: errorDef.statusCode || 502,
      local: errorDef.local || 'repositories/auth inserirRefreshToken()',
      typeError: errorDef.typeError || 'Erro na comunicação com banco de dados',
    }

    throw new CustomError(objectError)
  }
}

export default {
  excluirRefreshToken,
  login,
  inserirRefreshToken,
  obterToken,
}
