
import { TOAST_LIMIT } from "./constants"
import type { Action } from "./reducer"
import { reducer, setDispatchFunc } from "./reducer"
import type { ToastState } from "./types"

// Counter for generating unique IDs
let count = 0

export function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Internal state management
const listeners: Array<(state: ToastState) => void> = []
export let memoryState: ToastState = { toasts: [] }

// Dispatch function to update state
export function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Set the dispatch function in the reducer
setDispatchFunc(dispatch)

// Subscribe and unsubscribe functions for state management
export function subscribe(listener: (state: ToastState) => void) {
  listeners.push(listener)
  return () => {
    const index = listeners.indexOf(listener)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}
