<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://img.angeloanan.xyz/Y4laXvRA" alt="Lyrics Finder Logo"></a>
</p>

<h3 align="center">Lyrics Finder</h3>

<div align="center">

  ![Status](https://img.shields.io/badge/status-active-success.svg)
  [![Discord Invite Link](https://img.shields.io/badge/Support%20Server-Invite%20Link-blue?logo=discord)](https://discord.gg/mFvDvHc)
  [![GitHub Issues](https://img.shields.io/github/issues/angeloanan/lyrics-finder.svg)](https://github.com/angeloanan/lyrics-finder/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/angeloanan/lyrics-finder.svg)](https://github.com/angeloanan/lyrics-finder/pulls)
  [![License](https://img.shields.io/github/license/angeloanan/lyrics-finder)](/LICENSE)

</div>

---

<p align="center"> 🤖 A Discord bot which specializes on lyrics searching
    <br> 
</p>

## 📝 Table of Contents
+ [About](#about)
+ [Demo / Working](#demo)
+ [How it works](#working)
+ [Usage](#usage)
+ [Getting Started](#getting_started)
+ [Built Using](#built_using)
+ [TODO](../TODO.md)
+ [Contributing](../CONTRIBUTING.md)
+ [Authors](#authors)
+ [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
Lyrics Finder is a Discord bot which searches for Lyrics on Genius. It supports all song language, as long as it's listed on Genius. If you don't know the song title, you can search the song by using its lyrics.

If you display your current Spotify song as your Discord status, it can automatically search the song by using a command. Feeling like singing to your song? There's also a mode to search every song you're playing on Spotify.

## 🎥 Demo / Working <a name = "demo"></a>
![Simple Search](https://img.angeloanan.xyz/XbWljK4B)
![Search using lyrics](https://img.angeloanan.xyz/PRLY7NeJ)
![Multilingual Support Demo](https://img.angeloanan.xyz/5baOdwRd)
![Autosearch Mode Demo](https://img.angeloanan.xyz/3e3OyneV)

## 💭 How it works <a name = "working"></a>

The bot uses the [Genius API](https://genius.com/developers) to search the lyrics of a song. When searching using Spotify, the bot grabs the User presence and forms the search query by `<Song Title> <Song Artist>`, otherwise using the user's input.

After fetching the Genius API, it takes the first search result and scrape the lyrics page. This is complicated since Genius doesn't give the lyrics using their API and scraping the page tends to be very inconsistent.

The scrape result gets feed into a Regex filter, which then gets feed into a function, forming the Discord Embed fields.

The entire bot is written using [Typescript](https://typescriptlang.org) with [Discord.JS](https://discord.js.org) as the framework

## 🎈 Usage <a name = "usage"></a>

To use the bot, you will need to [**add the bot by clicking this link**](https://discord.com/oauth2/authorize?client_id=559265456008200222&permissions=314432&scope=bot).

Once done, you can display the help command by sending:
```
~!help
```

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the bot up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to install [NodeJS](https://nodejs.org) and the `node-gyp` build tool ([info](https://github.com/nodejs/node-gyp#installation)). [Yarn](https://yarnpkg.com) is recommended to install the project's dependency.

### Installing

You will need to clone the repo to your machine

```
$ git clone https://github.com/angeloanan/lyrics-finder.git
$ cd lyrics-finder
```

Install the dependencies

```
// Using NPM
$ npm install
// Using Yarn
$ yarn install
```

You will need to create a `.env` file or edit the system environment variable  
Example environment variable is available on `.env.example`

```
$ mv .env.example .env
$ nano .env
```

After everything has been set, you can run the bot
```
// Using NPM
$ npm start
// Using Yarn
$ yarn start
```

## ⛏️ Built Using <a name = "built_using"></a>
+ [Discord.js](https://discord.js.org) - Discord API wrapper
+ [Genius](https://genius.com/developer) - Provides lyrics and API
+ [Typescript](https://typescriptlang.org) - A typed superset of JavaScript

## ✍️ Authors <a name = "authors"></a>
+ [@angeloanan](https://github.com/angeloanan) - Idea & Initial work

See also the list of [contributors](https://github.com/angeloanan/lyrics-finder/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
+ Beta testing by Sam