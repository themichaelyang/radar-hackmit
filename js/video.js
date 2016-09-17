// 'use strict'

function getVideo() {
  // consider setting the video constraints in the individual video media track within the stream
  let video = document.createElement('video');
  let userMediaConstraints = {
    video: { width: 480, height: 270, facingMode: 'user' },
    audio: false
  };

  navigator.mediaDevices.getUserMedia(userMediaConstraints)
                        .then(onGetUserMediaSuccess)
                        .catch(onGetUserMediaError);

  function onGetUserMediaSuccess(mediaStream) {
    video.src = window.URL.createObjectURL(mediaStream);
    video.play();
  }

  function onGetUserMediaError(error) {
    console.error(error);
  }

  document.body.appendChild(video);
}
