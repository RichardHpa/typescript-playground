import type { AxiosPromise } from 'axios'
import { ButtonProps } from '@mui/material'

export interface RequestButtonProps extends ButtonProps {
  onRequest: (...args: any[]) => AxiosPromise | Promise<void>
}
