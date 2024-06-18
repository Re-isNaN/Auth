import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from '@/app'
import authServices from '@/api/services/auth/auth.services'
import { loginSchemas } from './auth.schemas'
import { CustomErrType, CustomError } from '@/errors/gerarErros'
import { JWTType } from '@/middlewares/authVerify'
import { validator } from '@/@types/validator'
import { TCredenciaisLogin } from '@/api/services/auth/auth.tipagens'
import { cookieIdDecode } from '@/middlewares/cookie.id.decode'

/**
 * @description Atualizar os tokens de acesso e atualizacao
 */
async function refresh(req: FastifyRequest, reply: FastifyReply) {
  try {
    const id = await cookieIdDecode(req)

    if (!id) {
      throw new Error('ID nao encontrado nos dados enviados')
    }

    const infoUser = (await authServices.obterToken(id))!

    const refreshToken = app.jwt.verify(infoUser.token!) as JWTType

    const infoAccessToken = {
      id: refreshToken.id,
      nome: refreshToken.nome,
    }

    const accessToken = await reply.jwtSign(infoAccessToken, {
      expiresIn: '6h',
    })

    reply
      .setCookie('accessToken', accessToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: 6 * 60 * 60, // 6h
      })
      .setCookie('id', refreshToken!.id.toString(), {
        path: '/',
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        signed: true,
      })
      .send(true)
  } catch (err) {
    const customErr = err as CustomErrType
    throw new CustomError({
      message: customErr.message || 'Erro ao atualizar os tokens',
      statusCode: 401,
      local: customErr.local || 'controllers/auth refresh()',
      typeError: 'Erro de autenticação',
    })
  }
}

/**
 * @description Entrar no sistema, credenciais e tokens de acesso
 */
async function login(req: FastifyRequest, reply: FastifyReply) {
  // ESQUELETO DO CORPO
  const { bodySchema } = loginSchemas

  // VALIDACAO E DEFINIÇÃO DAS CREDENCIAIS
  const credenciais: TCredenciaisLogin = validator(bodySchema, req.body)

  try {
    // USUARIO RECEBIDO
    const usuarioCadastrado = await authServices.login(credenciais)
    const infoRefresh = {
      id: usuarioCadastrado.id,
      nome: usuarioCadastrado.nome,
    }

    // GERAR O REFRESH TOKEN
    const refreshToken = await reply.jwtSign(infoRefresh, {
      sign: { expiresIn: '1h' },
    })

    // INSERIR O REFRESH TOKEN NO BANCO DE DADOS
    await authServices.inserirRefreshToken(refreshToken, usuarioCadastrado.id)

    // GERAR O ACCESS TOKEN
    const accessToken = await reply.jwtSign(usuarioCadastrado)

    reply
      .setCookie('id', usuarioCadastrado.id, {
        path: '/',
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        signed: true,
      })
      .setCookie(`accessToken`, accessToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: 10 * 60 * 60, // 10h
      })
      .send({
        nome: usuarioCadastrado.nome,
      })
  } catch (err) {
    const errorDef = err as CustomErrType
    // OBJETO DO ERRO
    const objectError = {
      message: errorDef.message || 'Erro ao realizar login',
      statusCode: errorDef.statusCode || 400,
      local: errorDef.local || 'controllers/login login()',
      typeError: errorDef.typeError || 'Erro solicitação inválida',
    }
    // GERAR ERRO
    throw new CustomError(objectError)
  }
}

/**
 * @description Sair do sistema, invalidar tokens
 */
async function logout(req: FastifyRequest, reply: FastifyReply) {
  try {
    const id = await cookieIdDecode(req)

    if (id === null) {
      throw new CustomError({
        message: 'Cabeçalho inconsistente',
        statusCode: 409,
        typeError: 'Erro credenciais inválidas',
      })
    }

    await authServices.excluirRefreshToken(id)

    reply
      .clearCookie('accessToken', {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'none',
      })
      .clearCookie('id', {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'none',
      })
  } catch (err) {
    const errorDef = err as CustomErrType

    // OBJETO DO ERRO
    const objectError = {
      message: errorDef.message || 'Erro ao sair do sistema (realizar logout)',
      statusCode: errorDef.statusCode || 400,
      local: errorDef.local || 'controllers/auth logout()',
      typeError: errorDef.typeError || 'Erro solicitação inválida',
    }

    // GERAR ERRO
    throw new CustomError(objectError)
  }
}

export default { refresh, login, logout }
