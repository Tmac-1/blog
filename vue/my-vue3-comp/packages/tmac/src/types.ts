import { ExtractPropTypes } from 'vue'

export const tmacProps = {
} as const

export type TmacProps = ExtractPropTypes<typeof tmacProps>
