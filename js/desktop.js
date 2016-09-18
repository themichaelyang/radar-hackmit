function main() {
  let r = Radar();
  let z = -1;
  let x;
  let y;

  r.start();

  window.setTimeout(() => {r.startLoop(() => {
    if (!Number.isNaN(r.getCoords().y)) {
      z = 1 - r.getCoords().y;
    }
  })}, 500); // absolute trash, please use promises next time
  let peer = new Peer('caller', {secure: true, host: 'localhost', port: 9000, path: '/'});
  // let peer = new Peer('caller', {secure: true, key: 'yxgyl5evdndn29'}); // their server doesn't support ssl
  let connection = peer.connect('callee');
  connection.on('open', () => {
    //  connection.send('dogs man');
  });
  connection.on('data', (data) => {

    x = data.x;
    y = data.y;
    console.log(x, y, z);
  });
}

window.onload = main;
