/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives';

let webview;
let count = 0;

alt.onServer('cef::killMsg:create', (data) => { if (webview != undefined) webview.emit('cef::killMsg:create', data)})
alt.onServer('cef::timer:push', (data) => { if (webview != undefined) webview.emit('cef::timer:push', data) })

alt.on('connectionComplete', () => {
    if (webview === undefined){
        webview = new alt.WebView('http://resource/client/html/cef/index.html')
    }

})