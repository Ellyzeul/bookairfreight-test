import { CartonControl, ContextState } from "../../Context/HomePageContext";
import selectorValue from "../util/selectorValue";
import chargeableWeight from "./chargeableWeight";
import oversizeFee from "./oversizeFee";
import perKgRate from "./perKgRate";

export default function shippingCost({origin, destination, channel, cartons, setInterfaceError}: ContextState) {
  const rate = perKgRate(
    selectorValue(origin, setInterfaceError),
    selectorValue(destination, setInterfaceError),
    selectorValue<'Air'|'Ocean'>(channel, setInterfaceError)
  )
  const basePrice = rate * chargeableWeight(cartonsValues(cartons, setInterfaceError))

  return basePrice + oversizeFee(selectorValue(origin, setInterfaceError), cartons)
}

function cartonsValues(cartons: Array<CartonControl>, setInterfaceError: (error: boolean) => void) {
  return cartons
    .map(({element}) => ({
      units: inputValue(element, 'units', setInterfaceError),
      width: inputValue(element, 'width', setInterfaceError),
      height: inputValue(element, 'height', setInterfaceError),
      length: inputValue(element, 'length', setInterfaceError),
      weight: inputValue(element, 'weight', setInterfaceError),
    }))
}

function inputValue(parent: HTMLDivElement, name: string, setInterfaceError: (error: boolean) => void): number {
  const input = parent.querySelector<HTMLInputElement>(`input[name='${name}']`)

  if(!input || isNaN(Number(input.value))) {
    setInterfaceError(true)
    throw new Error(`Input ${name} missing...`)
  }

  return Number(input.value)
}
