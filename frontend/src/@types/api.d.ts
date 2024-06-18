/**
 * @description Interface de resposta padrao do axios com generics para tipagem especifica
 */
export interface IApiResponse<T> {
    data?: T
}
  
/**
* @description Interface das resposta de erro da api
*/
export interface IApiResponseError {
    message: string
}