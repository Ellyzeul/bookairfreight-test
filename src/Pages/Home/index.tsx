import { useState } from "react"
import CartonSet from "../../Components/CartonSet"
import RedirectButton from "../../Components/RedirectButton"
import Selector from "../../Components/Selector"
import HomePageContext from "../../Context/HomePageContext"
import type { ContextState } from "../../Context/HomePageContext"
import "./style.css"
import validateHomeState from "../../lib/validateSelector"
import shippingCost from "../../lib/shippingCost"

export default function HomePage() {
  const [interfaceError, setInterfaceError] = useState(false)
  const [state, setState] = useState({
    origin: {},
    destination: {},
    channel: {},
    cartons: [],
    setInterfaceError,
  } as ContextState)

  function onButtonClick() {
    setInterfaceError(false)

    console.log(validateHomeState(state))
    if(!validateHomeState(state)) return

    console.log(shippingCost(state))
  }

  return (
    <HomePageContext.Provider value={{state, setState}}>
      <main className="container">
        <nav id="links">
          <RedirectButton label="Saved Quotes" href="/saved-quotes"/>
        </nav>
        <section id="options">
          <Selector label="Starting Country" options={STARTING_COUNTRIES}/>
          <Selector label="Destination Country" options={DESTINATION_COUNTRIES}/>
          <Selector label="Shipping Channel" options={SHIPPING_CHANNELS}/>
        </section>
        <CartonSet/>
        <button className="home-page-submit" onClick={onButtonClick}>Submit</button>
        {interfaceError && <span className="home-page-interface-error"> Error processing the quote...</span>}
      </main>
    </HomePageContext.Provider>
  )
}

const STARTING_COUNTRIES = [
  'China',
  'India',
  'Vietnam',
]
const DESTINATION_COUNTRIES = [
  'USA',
  'Germany',
  'Canada',
]
const SHIPPING_CHANNELS = [
  'Air',
  'Ocean',
]
