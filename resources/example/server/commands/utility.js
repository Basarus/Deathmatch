import { registerCmd } from '../systems/chat';
import alt from 'alt-server';

registerCmd('coords', '/coords | Returns current coordinates to chat and console.', player => {
    const coords = player.pos;
    player.send(JSON.stringify(coords));
    console.log(coords);
});

registerCmd('players', '/players | Returns current player count.', player => {
    player.send(`Player Count: ${alt.Player.all.length}`);
});

registerCmd('tpway', '', player => {
    alt.emitClient(player, 'util:tp:waypoint');
})