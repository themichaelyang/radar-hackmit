// function Caller() {
//   let caller = new Object();
//   let connection = new RTCPeerConnection();
//
//   connection.onicecandidate = (event) => { // trickle ice candidates
//     let candidate = event.candidate;
//     if (candidate) {
//       // send ice candidate
//     }
//     else {
//       // no more ice candidate
//     }
//   }
//
//   caller.connect = function() {
//     let createOfferPromise = connection.createOffer();
//     createOfferPromise.then(offer => connection.setLocalDescription(offer));
//
//   }
//
//   return caller;
// }
//
// function Callee() {
//   let callee = new Object();
//   let connection = new RTCPeerConnection();
//
//   function recieveIceCandidate() {
//
//   }
//
// }

// use a library instead lol
function Caller() {
  let caller = new Object();
  let peer = new Peer('caller', {key: 'lhlz7j58jh71ra4i'});

  caller.call = function() {
    let connection = peer.connect('callee');
    connection.on('data', data => {
      console.log(data);
    });
  }

  return caller;
}

function Callee() {
  let callee = new Object();
  let peer = new Peer('callee', {key: 'lhlz7j58jh71ra4i'});

  callee.listen = function() {
    peer.on('connect', () => {
      connection.on('data', data => {
        console.log(data);
      });
    })
  }
}
