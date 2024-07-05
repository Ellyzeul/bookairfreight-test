import { useContext, useState } from "react"
import "./style.css"
import HomePageContext, { ContextState } from "../../Context/HomePageContext"

export default function Selector({label, options}: Prop) {
  const [emptyInput, setEmptyInput] = useState(false)
  const {state, setState} = useContext(HomePageContext)

  function setSelectorControl(element: HTMLSelectElement | null) {
    if(!element || isPropertySet(state, label)) return
    
    setState(stateWithSelectControl(state, label, element, setEmptyInput))
  }

  return (
    <div className="selector-component">
      <div>{label}</div>
      <select
        name={label.toLowerCase().replaceAll(' ', '-')}
        ref={setSelectorControl}
        onChange={({target}) => setEmptyInput(target.value === '')}
        onBlur={({target}) => setEmptyInput(target.value === '')}
      >
        {[
          <option key={0} value="" onClick={() => setEmptyInput(true)}>Select a {label.toLowerCase()}</option>,
          ...options.map((option, key) => <option key={key+1} value={option}>{option}</option>)
        ]}
      </select>
      {emptyInput && <div className="selector-component-error-message">* You must select a value</div>}
    </div>
  )
}

type Prop = {
  label: Label,
  options: Array<string>
}

type Label = 'Starting Country' | 'Destination Country' | 'Shipping Channel'

function isPropertySet(state: ContextState, label: Label): boolean {
  return !!(((state as Record<string, object>)[KEY_FOR_LABEL[label]] as Record<string, unknown>)['element'])
}

function stateWithSelectControl(
  state: ContextState,
  label: Label,
  element: HTMLSelectElement,
  setEmptyInput: (empty: boolean) => void,
): ContextState {
  return {...state, [KEY_FOR_LABEL[label]]: {element, setEmptyInput}}
}

const KEY_FOR_LABEL: Record<Label, string> = {
  'Starting Country': 'origin',
  'Destination Country': 'destination',
  'Shipping Channel': 'channel',
}
