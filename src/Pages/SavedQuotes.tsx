import { useLiveQuery } from "dexie-react-hooks"
import db from "../Database/db"
import { useState } from "react"
import Quote from "../Components/Quote"
import RedirectButton from "../Components/RedirectButton"

export default function SavedQuotesPage() {
  const[quotes, setQuotes] = useState([] as Array<JSX.Element>)

  useLiveQuery(async() => {
    setQuotes((await db.quotes.toArray()).map(({origin, destination, channel, cost, delivery_days}, key) => <Quote
    key={key}
      origin={origin}
      destination={destination}
      channel={channel}
      cost={cost}
      delivery_days={delivery_days}
    />))
  })

  return (
    <main className="container">
      <RedirectButton label="Home" href="/"/>
      {quotes}
    </main>
  )
}