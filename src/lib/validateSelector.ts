import { ContextState } from "../Context/HomePageContext"

export default function validateHomeState(state: ContextState) {
  return [validateInputs, validateSelectors]
    .map(handler => handler(state))
    .reduce((acc, cur) => acc && cur, true)
}

function validateSelectors({origin, destination, channel}: ContextState) {
  return [origin, destination, channel]
    .map(({element, setEmptyInput}) => validateSelector(element, setEmptyInput))
    .reduce((acc, cur) => acc && cur, true)
}

function validateSelector(element?: HTMLSelectElement, setEmptyInput?: (empty: boolean) => void) {
  if(element && element.value !== '') return true

  setEmptyInput && setEmptyInput(true)
  return false
}

function validateInputs({cartons}: ContextState) {
  return cartons
    .map(({element, setEmptyInputCollection}) => INPUT_NAMES.map(name => ({
      element: element.querySelector<HTMLInputElement>(`input[name='${name}']`),
      setEmptyInput: setEmptyInputCollection[name]
    })))
    .map(inputSet => inputSet.map(({element, setEmptyInput}) => validateInput(element, setEmptyInput)))
    .flat()
    .reduce((acc, cur) => acc && cur, true)
}

const INPUT_NAMES = ['units', 'length', 'width', 'height', 'weight']

function validateInput(element: HTMLInputElement | null, setEmptyInput: (empty: boolean) => void) {
  if(element && element.value !== '') return true

  setEmptyInput(true)
  return false
}
