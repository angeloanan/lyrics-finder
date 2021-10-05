import { Client as DJSClient, ClientOptions, Collection } from 'discord.js'
import { join } from 'node:path'
import { readdir } from 'node:fs/promises'
import { Command } from './Command'

export type CustomClientOption = ClientOptions & {
  cmdDir?: string
  evtDir?: string
}

export class CustomClient extends DJSClient {
  cmds = new Collection<string, Command>()

  #eventDir: string
  #commandDir: string

  constructor(
    options: CustomClientOption = {
      cmdDir: join(__dirname, '../../src/cmds'),
      evtDir: join(__dirname, '../../events/cmds'),
      intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES']
    }
  ) {
    super(options)

    this.#commandDir = options.cmdDir || join(__dirname, '../../src/cmds')
    this.#eventDir = options.evtDir || join(__dirname, '../../events/cmds')
  }

  async loadCommands() {
    const cmds = (await this.readdir(this.#commandDir, Command).then(cmds =>
      cmds.map(c => new c(this))
    )) as Command[]

    for (const cmd of cmds) {
      this.cmds.set(cmd.config.name, cmd)
    }
  }

  async loadEvents() {
    const events = (await this.readdir(this.#eventDir, Event).then(evts =>
      evts.map(evt => new evt(this))
    )) as Event[]

    events
      .filter(e => !e.once)
      .map(e => {
        this.on(e.name, (...args) => e.run(...args))
      })

    events
      .filter(e => e.once)
      .map(e => {
        this.once(e.name, (...args) => e.run(...args))
      })
  }

  private async readdir<T extends new (...args: unknown[]) => T>(
    dir: string,
    kind: unknown
  ): Promise<T[]> {
    return readdir(dir)
      .then(files =>
        files
          .filter(f =>
            __filename.endsWith('.ts') ? f.endsWith('.ts') : f.endsWith('.js')
          )
          .map(f => import(join(dir, f)))
      )
      .then(Promise.all.bind(Promise))
      .then(imports =>
        (imports as { [key: string]: T }[])
          .map(Object.values)
          .flat()
          .filter(o => Object.getPrototypeOf(o) === kind)
      )
  }
}
