# CoffeeBot DiscordJS v14 Template
<img src="https://img.shields.io/badge/DiscordJS-v14.7.1-blue" /> <img src="https://img.shields.io/badge/NodeJS-v16.13.0-success" />


This is a template for a DiscordJS v14 bot with JavaScript support. It is based on the [DiscordJS Guide](https://discordjs.guide/).
This is the template used for [CoffeeBot](https://github.com/coffeebottv) and can easily be built upon to support more interaction features such as buttons, select menus, and more. The template was created for open use, so feel free to use it for your own projects. Read the instructions below to get started.

## Features
- [x] Command Handler
- [x] Event Handler
- [x] Mongoose connection
- [x] Slash Commands


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



## Issues
If you have any issues with the template, feel free to open an issue on the [GitHub Repository](https://github.com/coffeebottv/discord--template). We will try to get back to you as soon as possible.


## Shards
This template does not support sharding. If you want to add sharding to your bot, you can use the [DiscordJS Sharding Manager](https://discordjs.guide/sharding/#sharding-manager-script). A template for with sharding will be added in the future.
