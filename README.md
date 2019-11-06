# Dino Game server
Make the offline Google Chrome dino game online again, with added multiplayer support

## Overview
Simple backend using node.js, sequelize, express, json-sse, postgres, jwt, cors
Features:
* Create player
* Post scores
* Get scores
* Stream scores

## Installation

First, make a new docker container and run a postgres database
```
 $ docker run --rm -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres
```
Then, clone the repository, install dependencies and run it
```
git clone
npm install
node index.js
```
Now it's time to clone, install and run the front-end which you can find [here](https://github.com/Pittvandewitt/dinogame-client/)
