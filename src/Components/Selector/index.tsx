import { useState } from "react"
import "./style.css"

export default function Selector({label, options}: Prop) {
  const [emptyInput, setEmptyInput] = useState(false)

  return (
    <div className="selector-component">
      <div>{label}</div>
      <select
        name={label.toLowerCase().replaceAll(' ', '-')} 
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
  label: string,
  options: Array<string>
}
