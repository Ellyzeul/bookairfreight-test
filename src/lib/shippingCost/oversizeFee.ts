import { CartonControl } from "../../Context/HomePageContext";

export default function oversizeFee(origin: string, cartons: Array<CartonControl>) {
  return FEE_FOR_COUNTRY[origin](cartons)
}

const FEE_FOR_COUNTRY: Record<string, (cartons: Array<CartonControl>) => number> = {
  'China': (cartons) => cartons
    .map(({element}) => Number(element.querySelector<HTMLInputElement>("input[name='weight']")?.value) > 30)
    .reduce((acc, cur) => acc || cur, false) ? 30 : 0,
  'India': (cartons) => cartons
    .map(({element}) => Number(element.querySelector<HTMLInputElement>("input[name='length']")?.value) > 120)
    .reduce((acc, cur) => acc || cur, false) ? 60 : 0,
  'Vietnam': (cartons) => cartons
    .map(({element}) => 
      (Number(element.querySelector<HTMLInputElement>("input[name='weight']")?.value) > 20) &&
      (Number(element.querySelector<HTMLInputElement>("input[name='length']")?.value) > 100)
    )
    .reduce((acc, cur) => acc || cur, false) ? 65 : 0,
}
