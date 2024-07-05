import { createContext } from "react";

export default createContext({} as HomePageContextType)

type HomePageContextType = {
  state: ContextState,
  setState: (state: ContextState) => void
}

export type ContextState = {
  cartons: Array<{id: number, element: HTMLDivElement}>,
}
