import { IAuthContext } from "../@types/auth"
import { IApiResponse } from "../@types/api"

export interface IUseAuthContext extends IAuthContext {}
  
export type TInfoUser = IAuthContext['user']
  
export interface IAuthContextDadosRecebidosServidor {
    verificarToken: IApiResponse<TInfoUser>
    login: IApiResponse<TInfoUser>
}
  