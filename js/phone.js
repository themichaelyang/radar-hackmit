function main() {
  let r = Radar();

  let peer = new Peer('callee', {secure: true, host: 'localhost', port: 9000, path: '/'});
  peer.on('connection', function(conn) {
    r.start();
    window.setTimeout(()=>{r.startLoop()}, 500); // absolute trash, please use promises next time
    conn.on('data', function(data) {
      alert(data);
    });
 });
}

window.onload = main;
