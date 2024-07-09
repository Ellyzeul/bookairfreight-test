import { CartonControl, ContextState, SelectControl } from "../../Context/HomePageContext";
import chargeableWeight from "./chargeableWeight";
import oversizeFee from "./oversizeFee";
import perKgRate from "./perKgRate";

export default function shippingCost({origin, destination, channel, cartons, setInterfaceError}: ContextState) {
  function selectorValue<T>({element}: SelectControl) {
    return validateElement(element, setInterfaceError).value as T
  }

  const rate = perKgRate(selectorValue<string>(origin), selectorValue<string>(destination), selectorValue<'Air'|'Ocean'>(channel))
  const basePrice = rate * chargeableWeight(cartonsValues(cartons, setInterfaceError))

  return basePrice + oversizeFee(selectorValue<string>(origin), cartons)
}

function validateElement<T>(element: T | undefined, setInterfaceError: (error: boolean) => void) {
  if(!element) {
    setInterfaceError(true)
    throw new Error('Form element unset...')
  }

  return element
}

function cartonsValues(cartons: Array<CartonControl>, setInterfaceError: (error: boolean) => void) {
  return cartons
    .map(({element}) => ({
      units: retrieveInputValue(element, 'units', setInterfaceError),
      width: retrieveInputValue(element, 'width', setInterfaceError),
      height: retrieveInputValue(element, 'height', setInterfaceError),
      length: retrieveInputValue(element, 'length', setInterfaceError),
      weight: retrieveInputValue(element, 'weight', setInterfaceError),
    }))
}

function retrieveInputValue(parent: HTMLDivElement, name: string, setInterfaceError: (error: boolean) => void): number {
  const input = parent.querySelector<HTMLInputElement>(`input[name='${name}']`)

  if(!input) {
    setInterfaceError(true)
    throw new Error(`Input ${name} missing...`)
  }

  return Number(input.value)
}
