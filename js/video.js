'use strict';

let debug = false;
let displayCanvas;

function getVideo() {
  // consider setting the video constraints in the individual video media track within the stream
  let video = document.createElement('video');
  let userMediaConstraints = {
    // video: { width: 480, height: 270, facingMode: 'user' }, // set a framerate constraint?
    video: { width: 240, height: 135, facingMode: 'user' }, // set a framerate constraint?
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
  return video; // watch out! metadata doesnt load initially! its async
}

function getVideoFrame(video) {
  let canvas = document.createElement('canvas'); // consider reading raw img data from videos
  let ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  return ctx;
}

function main() {
  // let r = Radar();
  // r.start();
  //
  // r.startLoop();
  displayCanvas = document.createElement('canvas');
  displayCanvas.width = 240;
  displayCanvas.height = 135;
  document.body.appendChild(displayCanvas);
  displayCanvasContext = displayCanvas.getContext('2d');
}

function Radar() {
  let fps = 30;
  let radar = new Object();
  let comparer = new ImageCompare();
  let previousFrame;

  radar.start = () => {
    radar.video = getVideo(); // change to promise interface?
  }

  radar.startLoop = () => {
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
      // console.log(currentFrame.getImageData(0, 0, currentFrame.canvas.width, currentFrame.canvas.height).data);
      let xy = comparer.compare(currentFrame, previousFrame, 240, 135);
      console.log(xy);
      // console.log(currentFrame, previousFrame);
    }
  }

  return radar;
}

main();
