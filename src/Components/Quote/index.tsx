import { useState } from "react"
import "./style.css"
import db from "../../Database/db.ts"

export default function Quote({origin, destination, channel, cost, delivery_days, actions}: Prop) {
  const [error, setError] = useState(false)
  const [disableSave, setDisableSave] = useState(false)

  async function handleSave() {
    setDisableSave(true)

    try {
      await db.quotes.add({
        origin,
        destination,
        channel,
        cost,
        delivery_days
      })
    }
    catch(err) {
      setDisableSave(false)
      setError(true)
      console.error(err)
    }
  }

  function handleShare() {
    window.navigator.clipboard.writeText(`${window.origin}/shared-quote?${new URLSearchParams({
      origin,
      destination,
      channel,
      cost: String(cost),
      delivery_days: JSON.stringify(delivery_days)
    }).toString()}`)
  }

  return (
    <section className="quote-component">
      <div className="quote-component-left-side">
        <div className="quote-component-header">Traditional {channel.toLowerCase()} freight</div>
        <div className="quote-component-body">
          <span className="quote-component-days-interval">{delivery_days[0]}-{delivery_days[1]} days</span>
          <span className="quote-component-estimated-date">
            Estimated delivery:<br /><strong>{date(delivery_days[0])} - {date(delivery_days[1])}</strong>
          </span>
        </div>
      </div>
      <div className="quote-component-right-side">
        <div className="quote-component-header">{origin} to {destination}</div>
        <div className="quote-component-body">
          <span>US$ {cost.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</span>
          {actions && <div className="quote-component-action-buttons">
            <button disabled={disableSave} onClick={handleSave} className="quote-component-save-button">Save</button>
            <button onClick={handleShare} className="quote-component-share-button">Share</button>
          </div>}
          {error && <span className="quote-component-error-message">Error processing action...</span>}
        </div>
      </div>
    </section>
  )
}

type Prop = {
  origin: string,
  destination: string,
  channel: string,
  cost: number,
  delivery_days: [number, number],
  actions?: boolean,
}

function date(days: number) {
  const date = new Date()

  date.setDate(date.getDate() + days)

  return date.toDateString()
}
