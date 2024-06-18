/**
 * @description Tipagem recomendada para tipo vazio
 */
export type EmptyObject = Record<string, never>

/**
 * @description Interface das propriedades de um componente pai que recebe um children
 */
export interface IPropsChildrenComponent {
    children: ReactNode
}