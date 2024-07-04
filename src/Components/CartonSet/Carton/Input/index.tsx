import { useRef } from "react";
import { IMaskInput } from "react-imask";
import "./style.css"

export default function Input({label, name, mask}: Prop) {
  const ref = useRef(null)

  return (
    <div className="carton-input-component">
      <span>{label}</span>
      <IMaskInput ref={ref} name={name} mask={mask}/>
    </div>
  )
}

type Prop = {
  label: string,
  name: string,
  mask: RegExp,
}
