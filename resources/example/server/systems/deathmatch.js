/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import chalk from 'chalk';
import { HASH_BY_NAME } from '../gamedata/weapons';
import { DMdata } from './data';

let zone;
let gameZone;

function randomaizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

alt.on('anyResourceStart', (name) => {
    if (name === 'example'){
        startGame();
    }
})


function startGame() {
    zone = DMdata[randomaizer(0, DMdata.length - 1)];
    gameZone = new alt.ColshapeCylinder(zone.map.property.x, zone.map.property.y, zone.map.property.z - 50, zone.map.property.r, 90);
    gameTimer();
}


function spawn(player){
    alt.emitClient(player, 'deathmatch:time:set', zone.map.property.time)
    let pos = zone.map.coordsSpawn[randomaizer(0, zone.map.coordsSpawn.length - 1)];
    player.spawn(pos.x, pos.y, pos.z);
    player.model = zone.models[randomaizer(0, zone.models.length - 1)];
    player.health = 200;
    zone.weapon.map(weap => {
        player.giveWeapon(HASH_BY_NAME[weap], 9999, true);
    })
}

let times = [0, 10, 0];
let tm;

function gameTimer() { // Таймер

    clearInterval(tm)
    tm = setInterval(function () {

        times[2]--;

        if (times[0] == 0 && times[1] == 0 && times[2] == 0) {

            clearInterval(tm);
            startGame();
            times = [0, 10, 0]

        } else if (times[2] == -1) {

            times[2] = 59;
            times[1]--;
        } else if (times[1] == -1) {

            times[1] = 59;
            times[0]--;
        }

        var h = (times[0] < 10) ? '0' + times[0] : times[0],
            m = (times[1] < 10) ? '0' + times[1] : times[1],
            s = (times[2] < 10) ? '0' + times[2] : times[2];

        let timepull = m + ":" + s
       alt.Player.all.map(player => {
            alt.emitClient(player, 'cef::timer:push', timepull)
        })
    }, 1000);
}

// alt.on('entityEnterColshape', (colshape, player) => {
//     if(colshape == gameZone){
//         if (player.dinterval != undefined) {
//             alt.clearTimeout(player.dinterval);
//             player.dinterval = undefined;
//         }
//     }
// })

// alt.on('entityLeaveColshape', (colshape, player) => {
//     if (colshape == gameZone) {
//         if (player.dinterval == undefined) player.dinterval = alt.setTimeout(() => { player.health = 0 }, 10000);
//     }
// })

alt.on('playerConnect', (player) => {
    alt.emitClient(player, 'chat:Init');
    player.dinterval = undefined;
    spawn(player)
    alt.emitClient(player, 'deathmatch:blip:create', { x: zone.map.property.x, y: zone.map.property.y, z: zone.map.property.z})
})

alt.on('playerDeath', (player, killer, weapon) => {
    if (player && killer) alt.emitClient(null, 'cef::killMsg:create', {player1: player.name, player2: killer.name})
    spawn(player)
})

