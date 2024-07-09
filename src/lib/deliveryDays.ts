import { ContextState } from "../Context/HomePageContext";
import selectorValue from "./util/selectorValue";

export default function deliveryDays({channel, setInterfaceError}: ContextState): [number, number] {
  const shippingChannel = selectorValue<'Air' | 'Ocean'>(channel, setInterfaceError)
  const lower = lowerRange(shippingChannel)
  
  return [lower, upperRange(lower, shippingChannel)]
}

function lowerRange(channel: 'Air' | 'Ocean') {
  return randomInRange(LOWER_RANGE[channel])
}

function upperRange(lowerRange: number, channel: 'Air' | 'Ocean') {
  return lowerRange + randomInRange(UPPER_RANGE[channel])
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
