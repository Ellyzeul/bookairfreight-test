import CartonSet from "../../Components/CartonSet"
import RedirectButton from "../../Components/RedirectButton"
import Selector from "../../Components/Selector"
import "./style.css"

export default function HomePage() {
  return (
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
      <button className="home-page-submit">Submit</button>
    </main>
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
