import { EmptyObject } from "./geral"

/**
 * @description Interface dos dados do usuario
 */
interface IUser {
    nome: string
    empresa: string
}
  
/**
* @description Interface dos contexto de autenticacao
*/
export interface IAuthContext {
    user: IUser | EmptyObject
    verificarToken: () => Promise<boolean>
    login: (nome: string, senha: string) => Promise<boolean>
    logout: () => Promise<void>
}