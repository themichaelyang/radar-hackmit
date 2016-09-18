function main() {
  let r = Radar();
  r.start();

  window.setTimeout(() => {r.startLoop()}, 500); // absolute trash, please use promises next time
  let peer = new Peer('caller', {secure: true, host: 'localhost', port: 9000, path: '/'});
  // let peer = new Peer('caller', {secure: true, key: 'yxgyl5evdndn29'}); // their server doesn't support ssl
  let connection = peer.connect('callee');
  connection.on('open', () => {
    //  connection.send('dogs man');
  });
}

window.onload = main;
