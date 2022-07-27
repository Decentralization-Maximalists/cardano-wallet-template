const W3CWebSocket = require('websocket').w3cwebsocket;

// Create websocket for Ogmios on Cardano Box

export const OgmiosWS = new W3CWebSocket(
  sessionStorage.getItem("ogmiosURI") == null ?
    window.location.protocol == "http:" ? 
    `ws://ogmiosmain.bakon.dev`
    :
    `wss://ogmiosmain.bakon.dev`
    :
    window.location.protocol == "http:" ? 
    `ws://${sessionStorage.getItem("ogmiosURI")}:${sessionStorage.getItem("ogmiosPort")}`
    :
    `wss://${sessionStorage.getItem("ogmiosURI")}:${sessionStorage.getItem("ogmiosPort")}`
);

OgmiosWS.onopen = () => {
  console.log('Ogmios Connection opened');
  sessionStorage.setItem("ogmiosHealth", "connected")
};

OgmiosWS.onerror = () => {
  console.log('Ogmios Connection Error');
  sessionStorage.setItem("ogmiosHealth", "error")
};

OgmiosWS.onclose = () => {
  console.log('Ogmios Connection close');
  sessionStorage.setItem("ogmiosHealth", "closed")
};

export const wsp = (methodname, args) => {
  OgmiosWS.send(JSON.stringify({
    type: "jsonwsp/request",
    version: "1.0",
    servicename: "ogmios",
    methodname,
    args
  }));
}