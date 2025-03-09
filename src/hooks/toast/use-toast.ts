
import * as React from "react"
import { dispatch, genId, memoryState, subscribe } from "./store"
import type { Toast, ToasterToast } from "./types"

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })
  
  const markAsRead = () => dispatch({ type: "MARK_AS_READ", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      read: false,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
    markAsRead,
  }
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    const unsubscribe = subscribe(setState)
    return unsubscribe
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    markAsRead: (toastId: string) => dispatch({ type: "MARK_AS_READ", toastId }),
  }
}

export { useToast, toast }
