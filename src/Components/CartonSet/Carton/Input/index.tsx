import { useContext, useEffect, useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import "./style.css"
import HomePageContext from "../../../../Context/HomePageContext";

export default function Input({carton_id, label, name, mask}: Prop) {
  const ref = useRef(null)
  const [isEmpty, setEmptyInput] = useState(false)
  const {state, setState} = useContext(HomePageContext)

  useEffect(() => {
    setState({
      ...state,
      cartons: state.cartons.map((carton) => {
        if(carton.id !== carton_id) return carton

        carton.setEmptyInputCollection[name] = setEmptyInput
        return carton
      }),
    })
  }, [state.cartons])

  return (
    <div className="carton-input-component">
      <span>{label}</span>
      <IMaskInput
        ref={ref}
        name={name}
        mask={mask}
        onBlur={({target}) => target.value === '' && setEmptyInput(true)}
        onAccept={(value) => setEmptyInput(value === '')}
      />
      {isEmpty && <div className="carton-input-component-error-message">* You must select a value</div>}
    </div>
  )
}

type Prop = {
  carton_id: number,
  label: string,
  name: string,
  mask: RegExp,
}
