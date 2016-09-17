function getVideo() {

  let videoConstraints = {
    video: { width: 480, height: 270, facingMode: 'user' }
    audio: false,
  };

  navigator.mediaDevices.getUserMedia(videoConstraints)
                        .then(onGetUserMediaSuccess)
                        .catch(onGetUserMediaError);
}

function onGetUserMediaSuccess(mediaStream) {

}

function onGetUserMediaError(error) {

}
