import { ContextState } from "../Context/HomePageContext";
import selectorValue from "./util/selectorValue";

export default function deliveryDate({channel, setInterfaceError}: ContextState): [Date, Date] {
  const shippingChannel = selectorValue<'Air' | 'Ocean'>(channel, setInterfaceError)
  const date = new Date()
  
  return [
    new Date(lowerRange(date, shippingChannel)),
    new Date(upperRange(date, shippingChannel)),
  ]
}

function lowerRange(date: Date, channel: 'Air' | 'Ocean') {
  return date.setDate(date.getDate() + randomInRange(LOWER_RANGE[channel]))
}

function upperRange(date: Date, channel: 'Air' | 'Ocean') {
  return date.setDate(date.getDate() + randomInRange(UPPER_RANGE[channel]))
}

function randomInRange([low, high]: [number, number]) {
  return Math.round(Math.random() * (high - low) + low)
}

const LOWER_RANGE: Record<'Air' | 'Ocean', [number, number]> = {
  'Air': [3, 7],
  'Ocean': [25, 30],
}

const UPPER_RANGE: Record<'Air' | 'Ocean', [number, number]> = {
  'Air': [2, 4],
  'Ocean': [5, 10],
}
