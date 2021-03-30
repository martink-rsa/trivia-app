# Trivia app: Server

Todo:

1. Input validation for iconId and colorId when user joins room
2. Remove a player from the game class if they have left the room / closed the browser
3. Handle playing joining game in progress which will currently set everything back to lobby.

Issues:

1. If the admin player leaves the room, then a new admin will need to be appointed
2. This does not seem correct: serverIo.to(room).emit('updateGameState', 'LOBBY');

The design is viewable at: https://www.figma.com/file/UEcKqOJsedP0oq60JypDhV/Main-design

## Tasks

Tasks are available at: https://trello.com/b/EEXohng4/trivia-app

---

## Server

The server uses Node.js and socket.io

### Install

`yarn`

### To run:

Start a local database: `yarn startdb` (Do not close this window)

Start the dev server: `yarn dev` (Do not close this window)

### Tests

`yarn test`
