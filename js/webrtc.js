function callPeer() {
  let connection = new RTCPeerConnection();

  connection.onicecandidate = (event) => { // trickle ice candidates
    let candidate = event.candidate;
    if (candidate) {
      // send ice candidate
    }
    else {
      // no more ice candidate
    }
  }

  let createOfferPromise = connection.createOffer();
  createOfferPromise.then(offer => connection.setLocalDescription(offer));
}
