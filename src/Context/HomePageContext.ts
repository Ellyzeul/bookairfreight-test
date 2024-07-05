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
  cartons: Array<{id: number, element: HTMLDivElement}>,
}

type SelectControl = {
  element?: HTMLSelectElement,
  setEmptyInput?: (empty: boolean) => void
}
