import { createContext } from "react";

export default createContext({} as HomePageContextType)

type HomePageContextType = {
  state: ContextState,
  setState: (state: ContextState) => void
}

export type ContextState = {
  origin: SelectControl,
  destination: SelectControl,
  channel: SelectControl,
  cartons: Array<CartonControl>,
  setInterfaceError: (error: boolean) => void,
}

export type SelectControl = {
  element?: HTMLSelectElement,
  setEmptyInput?: (empty: boolean) => void,
}

export type CartonControl = {
  id: number,
  element: HTMLDivElement,
  setEmptyInputCollection: Record<string, (empty: boolean) => void>,
}
