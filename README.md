# Trivia app: Server

Todo:

1. Input validation for iconId and colorId when user joins room
2. Remove a player from the game class if they have left the room / closed the browser
3. Handle playing joining game in progress which will currently set everything back to lobby.

Issues:

1. If the admin player leaves the room, then a new admin will need to be appointed
2. This does not seem correct: serverIo.to(room).emit('updateGameState', 'LOBBY');

Should it not be just the player having the state updated?
