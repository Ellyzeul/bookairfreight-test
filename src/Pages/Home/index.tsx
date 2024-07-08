import { useState } from "react"
import CartonSet from "../../Components/CartonSet"
import RedirectButton from "../../Components/RedirectButton"
import Selector from "../../Components/Selector"
import HomePageContext from "../../Context/HomePageContext"
import type { ContextState } from "../../Context/HomePageContext"
import "./style.css"
import validateHomeState from "../../lib/validateSelector"

export default function HomePage() {
  const [state, setState] = useState({
    origin: {},
    destination: {},
    channel: {},
    cartons: [],
  } as ContextState)

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
        <button className="home-page-submit" onClick={() => console.log(validateHomeState(state))}>Submit</button>
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
