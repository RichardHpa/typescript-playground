import { useCallback, useState } from 'react'
import type { VFC } from 'react'
import { RequestButtonProps } from './types'
import LoadingButton from '@mui/lab/LoadingButton'

export const RequestButton: VFC<RequestButtonProps> = ({ children, onRequest, ...buttonProps }) => {
  const [loading, setLoading] = useState(false)

  const handleOnRequest = useCallback(async () => {
    setLoading(true)
    if (typeof onRequest === 'function') await onRequest()
    setLoading(false)
  }, [onRequest])

  return (
    <LoadingButton {...buttonProps} onClick={handleOnRequest} loading={loading}>
      {children}
    </LoadingButton>
  )
}
