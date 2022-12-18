# CoffeeBot DiscordJS v14 Template
<img src="https://img.shields.io/badge/DiscordJS-v14.7.1-blueviolet" />
<img src="https://img.shields.io/badge/NodeJS-v16.13.0-success" />


This is a template for a DiscordJS v14 bot with JavaScript support. It is based on the [DiscordJS Guide](https://discordjs.guide/).
This is the template used for [CoffeeBot](https://github.com/coffeebottv) and can easily be built upon to support more interaction features such as buttons, select menus, and more. The template was created for open use, so feel free to use it for your own projects. Read the instructions below to get started.

## Features
- [x] Command Handler
- [x] Event Handler
- [x] Mongoose connection
- [x] Slash Commands
- [x] Sharding
- [x] Express Server


## Getting Started
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file and add your bot token and MongoDB connection string as followed:
```
# This adjusts for what envirounment you are running the bot in, accepts "dev", "test", and "prod"
NODE_ENV="dev"

# Normally you would code in dev, and before going to prod, test the code with a test environment. 
# For this template we have commented out --test, but the code is still pressent in the codebase and can be used.
DISCORD_TOKEN_PROD=""
# DISCORD_TOKEN_TEST=""
DISCORD_TOKEN_DEV=""

MONGO_URI_PROD=""
# MONGO_URI_TEST=""
MONGO_URI_DEV=""

# Specift development guild
DEV_GUILD=""
```
4. Inside of `./events/client/ready.js` you will be able to change the bots presence and activity.

5. Run `npm dev-local` to start the bot in development mode and `npm prod-global` to start the bot in production mode.


## Commands
Commands are located in the `./commands` folder. The `./commands/example.js` file is an example command that can be used as a template for your own commands. The `./commands/example.js` file is also used for the `ping` and `uptime` command.
The `./commands` folder consists of a folder called `Development`, anything inside of here will only be registered to the guild specific in the `.env` file. This is useful for testing commands before going live.
Since the paths you speicify in each command will not match once you move commands outside of `Development`, we recommend using the folder `Production` for all commands that you want to go live with. This way you can easily move commands from `Development` to `Production` and vice versa without changing paths to match.


## Sharding
> **NOTE:** Before you dive into this section, please note that sharding may not be necessary for you. Sharding is only required at 2,500 guilds—at that point, Discord will not allow your bot to login without sharding. With that in mind, you should consider this when your bot is around 2,000 guilds, which should be enough time to get this working. Contrary to popular belief, sharding itself is very simple. It can be complicated depending on your bot's needs, however. If your bot is in a total of 2,000 or more servers, then please continue with this guide. Otherwise, it may be a good idea to wait until then
> https://discordjs.guide/sharding/#when-to-shard
You can view a sharding example in the `V14-JS-Sharding` branch. This branch is not maintained and is only used as an example. If you have any questions about sharding, feel free to open an issue on the [GitHub Repository](https://github.com/coffeebottv/discord-template/issues). We will try to get back to you as soon as possible.

This sharding example uses [discord-hybrid-sharding](https://www.npmjs.com/search?q=discord-hybrid-sharding) and [sharding-stats](https://www.npmjs.com/package/sharding-stats) along with [express](https://www.npmjs.com/package/express) to give an overview over shards.
The setup requires a little more effort as you will need both `client_id` and `client_secret` from the [Discord Developer Portal](https://discord.com/developers/applications). Once you have done this, you will need to add the values belove to your `.env` file:

You can then enter `http://localhost:3000` in your browser to authorize the clients access, and then head over to ``http://localhost:3000/statuspage`` to view the stats.


```
DISCORD_CLIENT_ID_PROD=""
DISCORD_CLIENT_ID_TEST=""
DISCORD_CLIENT_ID_DEV=""

DISCORD_CLIENT_SECRET_PROD=""
DISCORD_CLIENT_SECRET_TEST=""
DISCORD_CLIENT_SECRET_DEV=""
```



## Having issues?
If you have any issues with the template, feel free to open an issue on the [GitHub Repository](https://github.com/coffeebottv/discord-template). We will try to get back to you as soon as possible.

