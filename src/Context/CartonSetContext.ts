import { createContext } from "react"

const CartonSetContext = createContext({
  cartonsComponents: [],
  setCartonsComponents: () => {},
} as Context)

export default CartonSetContext

type Context = {
  cartonsComponents: Array<JSX.Element>,
  setCartonsComponents: (cartons: Array<JSX.Element>) => void,
}
