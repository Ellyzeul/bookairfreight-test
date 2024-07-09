import { useSearchParams } from "react-router-dom";
import RedirectButton from "../../Components/RedirectButton";
import { useEffect, useState } from "react";
import Quote from "../../Components/Quote";
import "./style.css"

export default function SharedQuotePage() {
  const [params] = useSearchParams()
  const [element, setElement] = useState(<></>)

  useEffect(() => {
    const {success, missing} = validateParams(params)

    setElement(
      success
        ? <Quote
          origin={paramValue(params, 'origin')}
          destination={paramValue(params, 'destination')}
          channel={paramValue(params, 'channel')}
          cost={paramValue(params, 'cost', 'number')}
          delivery_days={paramValue<[number, number]>(params, 'delivery_days', 'json')}
        />
        : missing.length === 1
          ? <p className="shared-quote-page-error-message">Parameter: {missing[0]} is missing...</p>
          : <p className="shared-quote-page-error-message">Parameters: {missing.join(', ')} are missing...</p>
    )
  }, [params])

  return (
    <main className="container">
      <RedirectButton label="Home" href="/"/>
      {element}
    </main>
  )
}

function validateParams(params: URLSearchParams) {
  const missing: Array<string> = []

  for(const param of REQUIRED_PARAMS) {
    if(!params.get(param)) missing.push(param)
  }

  return {success: missing.length === 0, missing}
}

const REQUIRED_PARAMS: Array<string> = [
  'origin',
  'destination',
  'channel',
  'cost',
  'delivery_days',
]

function paramValue(params: URLSearchParams, key: string): string;
function paramValue(params: URLSearchParams, key: string, type: 'number'): number;
function paramValue<T>(params: URLSearchParams, key: string, type: 'json'): T;
function paramValue<T = object>(params: URLSearchParams, key: string, type: 'string' | 'number' | 'json' = 'string') {
  const value = params.get(key)

  if(type === 'string') return String(value)
  if(type === 'number') return Number(value)
  if(type === 'json') return JSON.parse(value as string) as T
}
