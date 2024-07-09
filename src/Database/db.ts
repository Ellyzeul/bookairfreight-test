import Dexie, { EntityTable } from "dexie";

const DATABASE_NAME = 'bookairfreight_test'

const db = new Dexie(DATABASE_NAME) as Dexie & QuoteTable;

db.version(1).stores({
  quotes: '++id, origin, destination, channel, cost, delivery_days',
})

export default db

type QuoteTable = {
  quotes: EntityTable<{
    id: number,
    origin: string,
    destination: string,
    channel: string,
    cost: number,
    delivery_days: [number, number],
  }, 'id'>
}
