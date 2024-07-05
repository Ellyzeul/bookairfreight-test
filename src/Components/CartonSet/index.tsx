import { useState } from "react"
import Carton from "./Carton"
import "./style.css"
import CartonSetContext from "../../Context/CartonSetContext"

export default function CartonSet() {
  const [id, setId] = useState(1)

  const [cartonsComponents, setCartonsComponents] = useState([<Carton key={0} id={0}/>])

  function addCarton() {
    setCartonsComponents([...cartonsComponents, <Carton key={id} id={id}/>])
    setId(id + 1)
  }

  return (
    <CartonSetContext.Provider value={{cartonsComponents, setCartonsComponents}}>
      <section className="carton-set-component">
        {cartonsComponents}
        {
          cartonsComponents.length < 5
            ? <button
              className="carton-set-component-add"
              onClick={addCarton}
            >Add Carton</button>
            : <></>
        }
      </section>
    </CartonSetContext.Provider>
  )
}