import { Client as DJSClient, ClientOptions, Collection } from 'discord.js'
import { join } from 'node:path'
import { readdir } from 'node:fs/promises'
import { Command, Event } from '.'

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
      intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES']
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

    for (const event of events) {
      if (typeof event.once === 'function') {
        this.once(event.name, (...args) => event.once!(...args))
      }

      if (typeof event.on === 'function') {
        this.on(event.name, (...args) => event.on!(...args))
      }
    }
  }

  private async readdir<T extends new (...args: unknown[]) => T>(
    dir: string,
    kind: unknown
  ): Promise<T[]> {
    const files = await readdir(dir)
    const filesFullPath = (await Promise.all(
      files.filter(f => f.endsWith('.ts')).map(async f => import(join(dir, f)))
    )) as { [key: string]: T }[]
    return Promise.all(
      filesFullPath
        .map(Object.values)
        .flat()
        .filter(o => Object.getPrototypeOf(o) === kind)
    )

    // TODO: Sanity check if function functions equally
    // return readdir(dir)
    //   .then(files =>
    //     files
    //       .filter(f =>
    //         __filename.endsWith('.ts') ? f.endsWith('.ts') : f.endsWith('.js')
    //       )
    //       .map(f => import(join(dir, f)))
    //   )
    //   .then(Promise.all.bind(Promise))
    //   .then(imports =>
    //     (imports as { [key: string]: T }[])
    //       .map(Object.values)
    //       .flat()
    //       .filter(o => Object.getPrototypeOf(o) === kind)
    //   )
  }
}
