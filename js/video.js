"use strict";

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
  // document.body.appendChild(video);
  return video;
}

function getVideoFrame(video) {
  let canvas = document.createElement('canvas');
  canvas.width = video.width;
  canvas.height = video.height;
  return canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
}

function main() {
  let video = getVideo();

}

function radar() {
  let fps = 30;
  this.start = () => {
    this.video = getVideo(); // change to promise interface?
    window.requestAnimationFrame(() => {
      loop();
    });
  }

  function loop() { // we should pass in time differences?
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        loop();
        getVideoFrame(video);
      })
    }, 1000 / fps);
  }

  return this;
}
