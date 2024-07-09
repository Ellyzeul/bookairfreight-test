export default function perKgRate(origin: string, destination: string, channel: 'Air' | 'Ocean') {
  return RATES[`${origin}-${destination}`][channel]
}

const RATES: Record<string, {'Air': number, 'Ocean': number}> = {
  'China-Canada': {'Air': 10, 'Ocean': 5},
  'China-Germany': {'Air': 9, 'Ocean': 4},
  'China-USA': {'Air': 8, 'Ocean': 3},
  'India-Canada': {'Air': 20, 'Ocean': 10},
  'India-Germany': {'Air': 19, 'Ocean': 9},
  'India-USA': {'Air': 18, 'Ocean': 8},
  'Vietnam-Canada': {'Air': 30, 'Ocean': 15},
  'Vietnam-Germany': {'Air': 29, 'Ocean': 14},
  'Vietnam-USA': {'Air': 28, 'Ocean': 13},
}
