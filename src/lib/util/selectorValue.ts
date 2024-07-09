import { SelectControl } from "../../Context/HomePageContext"

export default function selectorValue<T = string>({element}: SelectControl, setInterfaceError: (error: boolean) => void) {
  return validateElement(element, setInterfaceError).value as T
}

function validateElement<T>(element: T | undefined, setInterfaceError: (error: boolean) => void) {
  if(!element) {
    setInterfaceError(true)
    throw new Error('Form element unset...')
  }

  return element
}
