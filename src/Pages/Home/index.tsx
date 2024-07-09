import { useState } from "react"
import CartonSet from "../../Components/CartonSet"
import RedirectButton from "../../Components/RedirectButton"
import Selector from "../../Components/Selector"
import HomePageContext from "../../Context/HomePageContext"
import type { ContextState } from "../../Context/HomePageContext"
import "./style.css"
import validateHomeState from "../../lib/validateSelector"
import shippingCost from "../../lib/shippingCost"
import Quote from "../../Components/Quote"
import selectorValue from "../../lib/util/selectorValue"
import deliveryDays from "../../lib/deliveryDays"

export default function HomePage() {
  const [interfaceError, setInterfaceError] = useState(false)
  const [quote, setQuote] = useState(<></>)
  const [state, setState] = useState({
    origin: {},
    destination: {},
    channel: {},
    cartons: [],
    setInterfaceError,
  } as ContextState)

  function onButtonClick() {
    setInterfaceError(false)

    if(!validateHomeState(state)) return
    
    setQuote(<Quote
      origin={selectorValue(state.origin, state.setInterfaceError)}
      destination={selectorValue(state.destination, state.setInterfaceError)}
      channel={selectorValue(state.channel, state.setInterfaceError)}
      cost={shippingCost(state)}
      delivery_days={deliveryDays(state)}
      actions={true}
    />)
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
        <div>
          <button className="home-page-submit" onClick={onButtonClick}>Submit</button>
          {interfaceError && <span className="home-page-interface-error"> Error processing the quote...</span>}
        </div>
        {quote}
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
