/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
import alt from 'alt-client';
import * as native from 'natives';

import '/client/panels/chat';
import './panels/cef';

let player = alt.Player.local;

let coords = {
    x: 1717.054931640625,
    y: -1634.2548828125,
    z: 112.4842529296875
}

alt.onServer('util:tp:waypoint', () => {
    let waypoint = native.getFirstBlipInfoId(8);
    if (native.doesBlipExist(waypoint)) {
        let coords = native.getBlipInfoIdCoord(waypoint);
        native.setEntityCoords(player.scriptID, coords.x, coords.y, coords.z, false, false, false, false);
    }
})

let blip;

alt.onServer('deathmatch:blip:create', (coords) => {
    if (native.isBlipOnMinimap) native.removeBlip(blip);
    blip = native.addBlipForRadius(coords.x, coords.y, coords.z, 90);
    native.setBlipAlpha(blip, 75);
    native.setBlipColour(blip, 1);
})

alt.onServer('deathmatch:time:set', (time) => {
    native.setClockTime(time, 0, 0);
})

alt.on('disconnect', () => {
    if (native.isBlipOnMinimap) native.removeBlip(blip);
})

alt.everyTick(() => {
    native.disableControlAction(0, 140, true)
    native.disableControlAction(0, 141, true)
    native.disableControlAction(0, 142, true)
    native.displayAmmoThisFrame(false);
    //native.hideHudComponentThisFrame(14); //reticle // Прицел
    native.hideHudComponentThisFrame(20); //weapon stats
    native.disableControlAction(0, 199, true);
    native.disableControlAction(0, 212, true);
});

alt.setStat('stamina', 100)
alt.setStat('strength', 100)
alt.setStat('lung_capacity', 100)
alt.setStat('wheelie_ability', 100)
alt.setStat('flying_ability', 100)
alt.setStat('shooting_ability', 100)
alt.setStat('stealth_ability', 100)

// You won't see this unless you're in-game.
alt.log('The resource has now started client-sided. Poggers');
