import { AutosearchStore } from './AutosearchStore'

export class Database {
  autosearch: AutosearchStore

  constructor() {
    this.autosearch = new AutosearchStore()
  }
}
