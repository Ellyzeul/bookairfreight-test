import { useContext } from "react"
import Input from "./Input"
import "./style.css"
import CartonSetContext from "../../../Context/CartonSetContext"

export default function Carton({id}: Prop) {
  const {cartons, setCartons} = useContext(CartonSetContext)

  return (
    <section className="carton-component">
      <span>Carton {cartons.findIndex(carton => Number(carton.key) === id) + 1}</span>
      <div>
        <Input label="Units" name="units" mask={POSITIVE_INT_REGEX}/>
        <Input label="Length (in cm)" name="units" mask={POSITIVE_FLOAT_REGEX}/>
        <Input label="Width (in cm)" name="units" mask={POSITIVE_FLOAT_REGEX}/>
        <Input label="Height (in cm)" name="units" mask={POSITIVE_FLOAT_REGEX}/>
        <Input label="Weight" name="units" mask={POSITIVE_FLOAT_REGEX}/>
        {
          cartons.length === 1
            ? <></>
            : <button
                className="carton-component-remove"
                onClick={() => setCartons(cartons.filter(carton => Number(carton.key) !== id))}
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
