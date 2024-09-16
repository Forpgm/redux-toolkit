import { AnyAction, isRejectedWithValue, Middleware, isRejected, MiddlewareAPI } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { CustomError, isEntityError } from 'utils/helpers'

function isPayLoadErrorMsg(payload: unknown): payload is { data: { error: string }; status: number } {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data.error === 'string'
  )
}
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (isRejected(action)) {
    if (action.error.name === 'CustomError') {
      // những lỗi liên quan đến runtime
      toast.warn(action.error.message)
    }
  }
  if (isRejectedWithValue(action)) {
    if (isPayLoadErrorMsg(action.payload)) {
      toast.warn(action.payload.data.error)
    } else if (!isEntityError(action.payload)) {
      toast.warn(action.error.message)
    }
  }
  return next(action)
}
