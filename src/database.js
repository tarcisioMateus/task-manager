import { isUtf8 } from "node:buffer"
import fs from "node:fs/promises"
const dbPath = new URL('../db.json', import.meta.url)

export class database {
  #db = {}

  constructor() {
    fs.readFile(dbPath, 'utf-8')
      .then(data => this.#db = JSON.parse(data))
      .catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(dbPath, JSON.stringify(this.#db))
  }
}