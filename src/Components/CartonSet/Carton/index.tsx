import { useContext } from "react"
import Input from "./Input"
import "./style.css"
import CartonSetContext from "../../../Context/CartonSetContext"
import HomePageContext from "../../../Context/HomePageContext"

export default function Carton({id}: Prop) {
  const {state, setState} = useContext(HomePageContext)
  const {cartons} = state
  const {cartonsComponents, setCartonsComponents} = useContext(CartonSetContext)
  
  function pushCartonRef(element: HTMLDivElement | null) {
    if(!element || cartons.findIndex(({id: elemId}) => elemId === id) !== -1) return

    setState({...state, cartons: [...cartons, {id, element, setEmptyInputCollection: {}}]})
  }

  function removeCarton() {
    setCartonsComponents(cartonsComponents.filter(carton => Number(carton.key) !== id))
    setState({...state, cartons: cartons.filter(({id: elemId}) => elemId !== id )})
  }

  return (
    <section className="carton-component">
      <span>Carton {cartonsComponents.findIndex(carton => Number(carton.key) === id) + 1}</span>
      <div ref={pushCartonRef} key={id}>
        <Input carton_id={id} label="Units" name="units" mask={POSITIVE_INT_REGEX}/>
        <Input carton_id={id} label="Length (in cm)" name="length" mask={POSITIVE_FLOAT_REGEX}/>
        <Input carton_id={id} label="Width (in cm)" name="width" mask={POSITIVE_FLOAT_REGEX}/>
        <Input carton_id={id} label="Height (in cm)" name="height" mask={POSITIVE_FLOAT_REGEX}/>
        <Input carton_id={id} label="Weight" name="weight" mask={POSITIVE_FLOAT_REGEX}/>
        {
          cartonsComponents.length === 1
            ? <></>
            : <button
                className="carton-component-remove"
                onClick={removeCarton}
              >Remove Carton</button>
        }
      </div>
    </section>
  )
}

type Prop = {
  id: number,
}

const POSITIVE_INT_REGEX = /^[0-9]+$/
const POSITIVE_FLOAT_REGEX = /^[0-9]+\.{0,1}[0-9]*$/
