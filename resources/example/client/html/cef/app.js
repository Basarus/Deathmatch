function killMsg(player1, player2) {
    let id = document.getElementById('killList');
    if (id.children.length >= 5) id.removeChild.firstChild();
    let killMsg = document.createElement('div');
    let msg1 = document.createElement('div');
    let msg2 = document.createElement('div');
    let scull = document.createElement('div');
    killMsg.classList.add('killmsg', 'animate__animated', 'animate__fadeInRightBig');
    msg1.innerHTML = player1; msg2.innerHTML = player2;
    msg1.classList.add('killmsg_player');
    msg2.classList.add('killmsg_player');
    scull.classList.add('skull');
    killMsg.appendChild(msg1); killMsg.appendChild(scull), killMsg.appendChild(msg2);
    id.appendChild(killMsg)
    setTimeout(() => { 
        killMsg.classList.add('killmsg', 'animate__animated', 'animate__fadeOutRightBig');
        setTimeout(() => id.lastChild.remove(), 1500)
    }, 5000)
}