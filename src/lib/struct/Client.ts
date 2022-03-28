import { REST } from '@discordjs/rest'
import { Client as DJSClient, ClientOptions, Collection } from 'discord.js'
import { Routes } from 'discord-api-types/v10'
import { readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Database } from '../db/index.js'
import { Command, Event } from '.'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Custom Object-Oriented Discord.js Client
 *
 * Original credit to Ben#0002 (MIT License, I've modified this)
 * @see https://github.com/Benricheson101/anti-phishing-bot/blob/main/lib/struct/client.ts
 */
export class CustomClient extends DJSClient {
  private eventsPath = join(__dirname, '../../events')
  private commandsPath = join(__dirname, '../../commands')

  commands = new Collection<string, Command>()
  db!: Database

  constructor(
    options: ClientOptions = {
      shards: 'auto',
      presence: {
        status: 'idle',
        activities: [{ name: 'Restarting...', type: 'PLAYING' }]
      },
      intents: ['GUILD_PRESENCES']
    }
  ) {
    super(options)
  }

  async init(): Promise<this> {
    await Promise.all([this.loadCommands(), this.loadEvents()])

    this.db = new Database()

    return this
  }

  async updateCommands(): Promise<this> {
    console.debug('Refreshing all application (/) commands...')
    const restClient = new REST({ version: '10' }).setToken(this.token as string)

    await Promise.all(
      this.commands.map(async c => {
        console.debug('Refreshing command', c.config.name)

        const commandConfig = c.config
        await restClient.put(Routes.applicationCommands(this.application?.id as string), {
          body: commandConfig
        })

        console.debug('Done refreshing command', c.config.name)
      })
    )

    console.debug('Successfully refreshed all application (/) commands.')

    return this
  }

  async loadCommands() {
    const commandsClass = await this.readDirectory(this.commandsPath)
    const commands = commandsClass.map(command => {
      return new command(this)
    }) as Command[]

    for (const command of commands) {
      console.debug('Setting command', command.config.name)
      this.commands.set(command.config.name, command)
    }

    console.debug(`Done loading commands! (${commands.length} loaded)`)
  }

  async loadEvents() {
    const events = (await this.readDirectory(this.eventsPath).then(events =>
      events.map(event => new event(this))
    )) as Event[]

    // TODO: Optimize using Class Object property
    for (const event of events) {
      console.debug(`Loading event ${event.name}`)
      if (event.once != null) {
        this.once(event.name, (...args) => event.once?.(...args))
      }

      if (event.on != null) {
        this.on(event.name, (...args) => event.on?.(...args))
      }
    }
    console.debug(`Done loading events! (${events.length} loaded)`)
  }

  private async readDirectory<T extends new (...args: unknown[]) => T>(
    dir: string
    // kind: unknown
  ): Promise<T[]> {
    const files = await readdir(dir)

    const loadedFiles = await Promise.all(files.map(async f => import(join(dir, f))))

    return Promise.all(
      loadedFiles.map(Object.values).flat()
      // .filter(o => Object.getPrototypeOf(o) === kind)
      // Don't need this for now
    )
  }
}
