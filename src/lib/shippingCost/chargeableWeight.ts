export default function chargeableWeight(cartons: Array<CartonValues>) {
  return Math.max(volumetricWeight(cartons), grossWeight(cartons))
}

type CartonValues = {
  units: number,
  width: number,
  height: number,
  length: number,
  weight: number,
}

function volumetricWeight(cartons: Array<CartonValues>) {
  return cartons
    .map(({units, width, height, length}) => units * width * height * length / DIVISION_RATE)
    .reduce((acc, cur) => acc + cur, 0)
}

function grossWeight(cartons: Array<CartonValues>) {
  return cartons
    .map(({units, weight}) => units * weight)
    .reduce((acc, cur) => acc + cur, 0)
}

const DIVISION_RATE = 5000
