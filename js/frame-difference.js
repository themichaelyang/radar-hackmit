'use strict';

let debug = false;
let canvas;
let context;
let pos = [0, 0];
// let xpixels = 480;
// let ypixels = 270;

// let xpixels = 360;
// let ypixels = 200;

let xpixels = 240;
let ypixels = 135;


function getVideo() {

    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = xpixels;
    canvas.height = ypixels;
    context = canvas.getContext('2d')

  // consider setting the video constraints in the individual video media track within the stream
  let video = document.createElement('video');
  let userMediaConstraints = {
    video: { width: {exact: xpixels}, height: {exact: ypixels}, facingMode: 'user' }, // set a framerate constraint?
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

function getPixelDistance(one, two, i) {
    var rdiff = one.data[i] - two.data[i];
    var gdiff = one.data[i + 1] - two.data[i + 1];
    var bdiff = one.data[i + 2] - two.data[i + 2];

    var dist = Math.floor(Math.sqrt(Math.pow(rdiff, 2) + Math.pow(gdiff, 2) + Math.pow(bdiff, 2)));
    return dist / 441;
}

function compare(currentFrame, previousFrame) {
    let changedIndexes = []
    let currentFrameImageData = currentFrame.getImageData(0, 0, xpixels, ypixels);
    let lastFrameImageData = previousFrame.getImageData(0, 0, xpixels, ypixels);
	  let processedImageData = currentFrame.createImageData(currentFrameImageData);

    for (let i = 0; i < currentFrameImageData.data.length; i += 4) {
        // canvas image data is ordered "r, g, b, a" in a clamped byte array
        // processedImageData = processedImageData.data[i, i + 3]
        if (getPixelDistance(currentFrameImageData, lastFrameImageData, i) > 0.15) {
            let index = i / 4;
            changedIndexes.push(index);

            processedImageData.data[i] = 0;
            processedImageData.data[i + 1] = 0;
            processedImageData.data[i + 2] = 0;
            processedImageData.data[i + 3] = 255;
        }
    }
    context.putImageData(processedImageData, 0, 0);

    let changedxy = changedIndexes.map(function(x){
        return indexToCoordinates(x, xpixels);
    })

    let changes = changedxy.length;
    let sumx = 0;
    let sumy = 0;
    // let
    for (let pixel of changedxy) {
        sumx += pixel.x;
        sumy += pixel.y;
    }
    return [changes, sumx/changes, sumy/changes];
    console.log(change, sumx/changes, sumy/changes);

    // context.putImageData(processedImageData, 0, 0);
}

function indexToCoordinates(index, width) { // remember that the index is r g b a!!! fix this function
    var y = Math.floor(index / width);
    var x = index - (y * width);
    return {
        x: x,
        y: y
    };
}

function Radar() {
  let fps = 20;
  let radar = new Object();
  // let comparer = new ImageCompare();
  let previousFrame;
  radar.coords = {x: -1, y: -1};

  radar.start = () => {
    radar.video = getVideo(); // change to promise interface?
  }

  radar.startLoop = function(callOnLoop) {
    window.requestAnimationFrame(() => {
      loop(callOnLoop);
    });
  }

  function loop(callOnLoop) { // we should pass in time differences?
    let currentFrame = getVideoFrame(radar.video);
    process(currentFrame, previousFrame);

    callOnLoop();

    previousFrame = currentFrame;

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        loop(callOnLoop);
      })
    }, 1000 / fps);

  }

  function process(currentFrame, previousFrame) {
    if (previousFrame) {
      let xy = compare(currentFrame, previousFrame, xpixels, ypixels); // this is terrible, fix this later
      let coords = {};
      if (xy[0] > 150){
          // pos[0] = xy[1];
          // pos[1] = xy[2];
          coords.x = xy[1];
          coords.y = xy[2];

        //   pos[0] = xy[1] / ypixels
        //   pos[1] = xy[2] / xpixels
        }
        // context.putImageData(processedImageData, pos[0], pos[1]);
        // console.log(pos);
        context.fillStyle = 'red';
        context.fillRect(coords.x, coords.y, 20, 20);
    //   console.log(xy);
        radar.coords = normalizeCoordinates(coords);
    }
  }

  function normalizeCoordinates(coordinates) {
    return {
      x: coordinates.x / xpixels,
      y: coordinates.y / ypixels
    }
  }

  radar.getCoords = function() {
    return radar.coords;
  }

  return radar;
}

// why isn't this separated into files?!??!
