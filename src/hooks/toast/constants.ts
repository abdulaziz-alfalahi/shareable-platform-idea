
export const TOAST_LIMIT = 5;
export const TOAST_REMOVE_DELAY = 5000;

export const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
  MARK_AS_READ: "MARK_AS_READ",
} as const;

export type ActionType = typeof actionTypes;
