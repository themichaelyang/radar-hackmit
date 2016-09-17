'use strict';

function getVideo() {
  // consider setting the video constraints in the individual video media track within the stream
  let video = document.createElement('video');
  let userMediaConstraints = {
    video: { width: 480, height: 270, facingMode: 'user' }, // set a framerate constraint?
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
  return video;
}

function getVideoFrame(video) {
  let canvas = document.createElement('canvas'); // consider reading raw img data from videos
  let ctx = canvas.getContext('2d');
  canvas.width = video.width;
  canvas.height = video.height;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  return canvas;
}

function main() {
  let r = new Radar();
  r.start();
}

function Radar() {
  let fps = 30;
  let radar = new Object();
  let comparer = new ImageCompare();
  let previousFrame;

  radar.start = () => {
    radar.video = getVideo(); // change to promise interface?
    window.requestAnimationFrame(() => {
      loop();
    });
  }

  function loop() { // we should pass in time differences?
    let currentFrame = getVideoFrame(radar.video);
    process(currentFrame, previousFrame);

    previousFrame = currentFrame;

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        loop();
      })
    }, 1000 / fps);

  }

  function process(currentFrame, previousFrame) {
    if (previousFrame) {
      let xy = comparer.compare(currentFrame, previousFrame);
      console.log(xy);
    }
  }

  return radar;
}

main();
