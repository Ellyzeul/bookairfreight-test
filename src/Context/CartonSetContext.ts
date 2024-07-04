import { createContext } from "react"

const CartonSetContext = createContext({
  cartons: [],
  setCartons: () => {},
} as Context)

export default CartonSetContext

type Context = {
  cartons: Array<JSX.Element>,
  setCartons: (cartons: Array<JSX.Element>) => void,
}
