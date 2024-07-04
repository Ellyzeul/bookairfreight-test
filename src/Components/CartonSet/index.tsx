import { useState } from "react"
import Carton from "./Carton"
import "./style.css"
import CartonSetContext from "../../Context/CartonSetContext"

export default function CartonSet() {
  const [cartons, setCartons] = useState([<Carton key={0} id={0}/>])
  const [id, setId] = useState(1)

  function addCarton() {
    setCartons([...cartons, <Carton key={id} id={id}/>])
    setId(id + 1)
  }

  return (
    <CartonSetContext.Provider value={{cartons, setCartons}}>
      <section className="carton-set-component">
        {cartons}
        {
          cartons.length < 5
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