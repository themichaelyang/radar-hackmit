'use strict';

var debug = false;
var canvas = void 0;
var context = void 0;
var pos = [0, 0];
var xpixels = 480;
var ypixels = 270;

function getVideo() {

  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.width = xpixels;
  canvas.height = ypixels;
  context = canvas.getContext('2d');

  // consider setting the video constraints in the individual video media track within the stream
  var video = document.createElement('video');
  var userMediaConstraints = {
    video: { width: { exact: xpixels }, height: { exact: ypixels }, facingMode: 'user' }, // set a framerate constraint?
    audio: false
  };

  navigator.mediaDevices.getUserMedia(userMediaConstraints).then(onGetUserMediaSuccess).catch(onGetUserMediaError);

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
  var canvas = document.createElement('canvas'); // consider reading raw img data from videos
  var ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return ctx;
}

function main() {}

function getPixelDistance(one, two, i) {
  var rdiff = one.data[i] - two.data[i];
  var gdiff = one.data[i + 1] - two.data[i + 1];
  var bdiff = one.data[i + 2] - two.data[i + 2];

  var dist = Math.floor(Math.sqrt(Math.pow(rdiff, 2) + Math.pow(gdiff, 2) + Math.pow(bdiff, 2)));
  return dist / 441;
}

function compare(currentFrame, previousFrame) {
  var changedIndexes = [];
  var currentFrameImageData = currentFrame.getImageData(0, 0, xpixels, ypixels);
  var lastFrameImageData = previousFrame.getImageData(0, 0, xpixels, ypixels);
  var processedImageData = currentFrame.createImageData(currentFrameImageData);

  for (var i = 0; i < currentFrameImageData.data.length; i += 4) {
    // canvas image data is ordered "r, g, b, a" in a clamped byte array
    // processedImageData = processedImageData.data[i, i + 3]
    if (getPixelDistance(currentFrameImageData, lastFrameImageData, i) > 0.2) {
      var index = i / 4;
      changedIndexes.push(index);

      processedImageData.data[i] = 0;
      processedImageData.data[i + 1] = 0;
      processedImageData.data[i + 2] = 0;
      processedImageData.data[i + 3] = 255;
    }
  }
  context.putImageData(processedImageData, 0, 0);

  var changedxy = changedIndexes.map(function (x) {
    return indexToCoordinates(x, xpixels);
  });

  var changes = changedxy.length;
  var sumx = 0;
  var sumy = 0;
  // let
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = changedxy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pixel = _step.value;

      sumx += pixel.x;
      sumy += pixel.y;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return [changes, sumx / changes, sumy / changes];
  console.log(change, sumx / changes, sumy / changes);

  // context.putImageData(processedImageData, 0, 0);
}

function indexToCoordinates(index, width) {
  // remember that the index is r g b a!!! fix this function
  var y = Math.floor(index / width);
  var x = index - y * width;
  return {
    x: x,
    y: y
  };
}

function Radar() {
  var fps = 16;
  var radar = new Object();
  // let comparer = new ImageCompare();
  var previousFrame = void 0;

  radar.start = function () {
    radar.video = getVideo(); // change to promise interface?
  };

  radar.startLoop = function () {
    window.requestAnimationFrame(function () {
      loop();
    });
  };

  function loop() {
    // we should pass in time differences?
    var currentFrame = getVideoFrame(radar.video);
    process(currentFrame, previousFrame);

    previousFrame = currentFrame;

    window.setTimeout(function () {
      window.requestAnimationFrame(function () {
        loop();
      });
    }, 1000 / fps);
  }

  function process(currentFrame, previousFrame) {
    if (previousFrame) {
      var xy = compare(currentFrame, previousFrame, xpixels, ypixels);

      if (xy[0] > 50) {
        pos[0] = xy[1];
        pos[1] = xy[2];
        //   pos[0] = xy[1] / ypixels
        //   pos[1] = xy[2] / xpixels
      }
      // context.putImageData(processedImageData, pos[0], pos[1]);
      console.log(pos);
      context.fillStyle = 'red';
      context.fillRect(pos[0], pos[1], 20, 20);
      //   console.log(xy);
    }
  }

  return radar;
}

main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyYW1lLWRpZmZlcmVuY2UuanMiXSwibmFtZXMiOlsiZGVidWciLCJjYW52YXMiLCJjb250ZXh0IiwicG9zIiwieHBpeGVscyIsInlwaXhlbHMiLCJnZXRWaWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0Q29udGV4dCIsInZpZGVvIiwidXNlck1lZGlhQ29uc3RyYWludHMiLCJleGFjdCIsImZhY2luZ01vZGUiLCJhdWRpbyIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsInRoZW4iLCJvbkdldFVzZXJNZWRpYVN1Y2Nlc3MiLCJjYXRjaCIsIm9uR2V0VXNlck1lZGlhRXJyb3IiLCJtZWRpYVN0cmVhbSIsInNyYyIsIndpbmRvdyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInBsYXkiLCJlcnJvciIsImNvbnNvbGUiLCJnZXRWaWRlb0ZyYW1lIiwiY3R4IiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiZHJhd0ltYWdlIiwibWFpbiIsImdldFBpeGVsRGlzdGFuY2UiLCJvbmUiLCJ0d28iLCJpIiwicmRpZmYiLCJkYXRhIiwiZ2RpZmYiLCJiZGlmZiIsImRpc3QiLCJNYXRoIiwiZmxvb3IiLCJzcXJ0IiwicG93IiwiY29tcGFyZSIsImN1cnJlbnRGcmFtZSIsInByZXZpb3VzRnJhbWUiLCJjaGFuZ2VkSW5kZXhlcyIsImN1cnJlbnRGcmFtZUltYWdlRGF0YSIsImdldEltYWdlRGF0YSIsImxhc3RGcmFtZUltYWdlRGF0YSIsInByb2Nlc3NlZEltYWdlRGF0YSIsImNyZWF0ZUltYWdlRGF0YSIsImxlbmd0aCIsImluZGV4IiwicHVzaCIsInB1dEltYWdlRGF0YSIsImNoYW5nZWR4eSIsIm1hcCIsIngiLCJpbmRleFRvQ29vcmRpbmF0ZXMiLCJjaGFuZ2VzIiwic3VteCIsInN1bXkiLCJwaXhlbCIsInkiLCJsb2ciLCJjaGFuZ2UiLCJSYWRhciIsImZwcyIsInJhZGFyIiwiT2JqZWN0Iiwic3RhcnQiLCJzdGFydExvb3AiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsb29wIiwicHJvY2VzcyIsInNldFRpbWVvdXQiLCJ4eSIsImZpbGxTdHlsZSIsImZpbGxSZWN0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFJQSxRQUFRLEtBQVo7QUFDQSxJQUFJQyxlQUFKO0FBQ0EsSUFBSUMsZ0JBQUo7QUFDQSxJQUFJQyxNQUFNLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBVjtBQUNBLElBQUlDLFVBQVUsR0FBZDtBQUNBLElBQUlDLFVBQVUsR0FBZDs7QUFFQSxTQUFTQyxRQUFULEdBQW9COztBQUVoQkwsV0FBU00sU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFUO0FBQ0FELFdBQVNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlQsTUFBMUI7QUFDQUEsU0FBT1UsS0FBUCxHQUFlUCxPQUFmO0FBQ0FILFNBQU9XLE1BQVAsR0FBZ0JQLE9BQWhCO0FBQ0FILFlBQVVELE9BQU9ZLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBVjs7QUFFRjtBQUNBLE1BQUlDLFFBQVFQLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBLE1BQUlPLHVCQUF1QjtBQUN6QkQsV0FBTyxFQUFFSCxPQUFPLEVBQUNLLE9BQU9aLE9BQVIsRUFBVCxFQUEyQlEsUUFBUSxFQUFDSSxPQUFPWCxPQUFSLEVBQW5DLEVBQXFEWSxZQUFZLE1BQWpFLEVBRGtCLEVBQ3lEO0FBQ2xGQyxXQUFPO0FBRmtCLEdBQTNCOztBQUtBQyxZQUFVQyxZQUFWLENBQXVCQyxZQUF2QixDQUFvQ04sb0JBQXBDLEVBQ3VCTyxJQUR2QixDQUM0QkMscUJBRDVCLEVBRXVCQyxLQUZ2QixDQUU2QkMsbUJBRjdCOztBQUlBLFdBQVNGLHFCQUFULENBQStCRyxXQUEvQixFQUE0QztBQUMxQ1osVUFBTWEsR0FBTixHQUFZQyxPQUFPQyxHQUFQLENBQVdDLGVBQVgsQ0FBMkJKLFdBQTNCLENBQVo7QUFDQVos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InNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubGV0IGRlYnVnID0gZmFsc2U7XG5sZXQgY2FudmFzO1xubGV0IGNvbnRleHQ7XG5sZXQgcG9zID0gWzAsIDBdO1xubGV0IHhwaXhlbHMgPSA0ODA7XG5sZXQgeXBpeGVscyA9IDI3MDtcblxuZnVuY3Rpb24gZ2V0VmlkZW8oKSB7XG5cbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgY2FudmFzLndpZHRoID0geHBpeGVscztcbiAgICBjYW52YXMuaGVpZ2h0ID0geXBpeGVscztcbiAgICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcblxuICAvLyBjb25zaWRlciBzZXR0aW5nIHRoZSB2aWRlbyBjb25zdHJhaW50cyBpbiB0aGUgaW5kaXZpZHVhbCB2aWRlbyBtZWRpYSB0cmFjayB3aXRoaW4gdGhlIHN0cmVhbVxuICBsZXQgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICBsZXQgdXNlck1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgdmlkZW86IHsgd2lkdGg6IHtleGFjdDogeHBpeGVsc30sIGhlaWdodDoge2V4YWN0OiB5cGl4ZWxzfSwgZmFjaW5nTW9kZTogJ3VzZXInIH0sIC8vIHNldCBhIGZyYW1lcmF0ZSBjb25zdHJhaW50P1xuICAgIGF1ZGlvOiBmYWxzZVxuICB9O1xuXG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHVzZXJNZWRpYUNvbnN0cmFpbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ob25HZXRVc2VyTWVkaWFTdWNjZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKG9uR2V0VXNlck1lZGlhRXJyb3IpO1xuXG4gIGZ1bmN0aW9uIG9uR2V0VXNlck1lZGlhU3VjY2VzcyhtZWRpYVN0cmVhbSkge1xuICAgIHZpZGVvLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKG1lZGlhU3RyZWFtKTtcbiAgICB2aWRlby5wbGF5KCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkdldFVzZXJNZWRpYUVycm9yKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gIH1cblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgcmV0dXJuIHZpZGVvOyAvLyB3YXRjaCBvdXQhIG1ldGFkYXRhIGRvZXNudCBsb2FkIGluaXRpYWxseSEgaXRzIGFzeW5jXG59XG5cbmZ1bmN0aW9uIGdldFZpZGVvRnJhbWUodmlkZW8pIHtcbiAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyAvLyBjb25zaWRlciByZWFkaW5nIHJhdyBpbWcgZGF0YSBmcm9tIHZpZGVvc1xuICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNhbnZhcy53aWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgY3R4LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICByZXR1cm4gY3R4O1xufVxuXG5mdW5jdGlvbiBtYWluKCkge1xuXG59XG5cbmZ1bmN0aW9uIGdldFBpeGVsRGlzdGFuY2Uob25lLCB0d28sIGkpIHtcbiAgICB2YXIgcmRpZmYgPSBvbmUuZGF0YVtpXSAtIHR3by5kYXRhW2ldO1xuICAgIHZhciBnZGlmZiA9IG9uZS5kYXRhW2kgKyAxXSAtIHR3by5kYXRhW2kgKyAxXTtcbiAgICB2YXIgYmRpZmYgPSBvbmUuZGF0YVtpICsgMl0gLSB0d28uZGF0YVtpICsgMl07XG5cbiAgICB2YXIgZGlzdCA9IE1hdGguZmxvb3IoTWF0aC5zcXJ0KE1hdGgucG93KHJkaWZmLCAyKSArIE1hdGgucG93KGdkaWZmLCAyKSArIE1hdGgucG93KGJkaWZmLCAyKSkpO1xuICAgIHJldHVybiBkaXN0IC8gNDQxO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlKGN1cnJlbnRGcmFtZSwgcHJldmlvdXNGcmFtZSkge1xuICAgIGxldCBjaGFuZ2VkSW5kZXhlcyA9IFtdXG4gICAgbGV0IGN1cnJlbnRGcmFtZUltYWdlRGF0YSA9IGN1cnJlbnRGcmFtZS5nZXRJbWFnZURhdGEoMCwgMCwgeHBpeGVscywgeXBpeGVscyk7XG4gICAgbGV0IGxhc3RGcmFtZUltYWdlRGF0YSA9IHByZXZpb3VzRnJhbWUuZ2V0SW1hZ2VEYXRhKDAsIDAsIHhwaXhlbHMsIHlwaXhlbHMpO1xuXHQgIGxldCBwcm9jZXNzZWRJbWFnZURhdGEgPSBjdXJyZW50RnJhbWUuY3JlYXRlSW1hZ2VEYXRhKGN1cnJlbnRGcmFtZUltYWdlRGF0YSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRGcmFtZUltYWdlRGF0YS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIC8vIGNhbnZhcyBpbWFnZSBkYXRhIGlzIG9yZGVyZWQgXCJyLCBnLCBiLCBhXCIgaW4gYSBjbGFtcGVkIGJ5dGUgYXJyYXlcbiAgICAgICAgLy8gcHJvY2Vzc2VkSW1hZ2VEYXRhID0gcHJvY2Vzc2VkSW1hZ2VEYXRhLmRhdGFbaSwgaSArIDNdXG4gICAgICAgIGlmIChnZXRQaXhlbERpc3RhbmNlKGN1cnJlbnRGcmFtZUltYWdlRGF0YSwgbGFzdEZyYW1lSW1hZ2VEYXRhLCBpKSA+IDAuMikge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gaSAvIDQ7XG4gICAgICAgICAgICBjaGFuZ2VkSW5kZXhlcy5wdXNoKGluZGV4KTtcblxuICAgICAgICAgICAgcHJvY2Vzc2VkSW1hZ2VEYXRhLmRhdGFbaV0gPSAwO1xuICAgICAgICAgICAgcHJvY2Vzc2VkSW1hZ2VEYXRhLmRhdGFbaSArIDFdID0gMDtcbiAgICAgICAgICAgIHByb2Nlc3NlZEltYWdlRGF0YS5kYXRhW2kgKyAyXSA9IDA7XG4gICAgICAgICAgICBwcm9jZXNzZWRJbWFnZURhdGEuZGF0YVtpICsgM10gPSAyNTU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEocHJvY2Vzc2VkSW1hZ2VEYXRhLCAwLCAwKTtcblxuICAgIGxldCBjaGFuZ2VkeHkgPSBjaGFuZ2VkSW5kZXhlcy5tYXAoZnVuY3Rpb24oeCl7XG4gICAgICAgIHJldHVybiBpbmRleFRvQ29vcmRpbmF0ZXMoeCwgeHBpeGVscyk7XG4gICAgfSlcblxuICAgIGxldCBjaGFuZ2VzID0gY2hhbmdlZHh5Lmxlbmd0aDtcbiAgICBsZXQgc3VteCA9IDA7XG4gICAgbGV0IHN1bXkgPSAwO1xuICAgIC8vIGxldFxuICAgIGZvciAobGV0IHBpeGVsIG9mIGNoYW5nZWR4eSkge1xuICAgICAgICBzdW14ICs9IHBpeGVsLng7XG4gICAgICAgIHN1bXkgKz0gcGl4ZWwueTtcbiAgICB9XG4gICAgcmV0dXJuIFtjaGFuZ2VzLCBzdW14L2NoYW5nZXMsIHN1bXkvY2hhbmdlc107XG4gICAgY29uc29sZS5sb2coY2hhbmdlLCBzdW14L2NoYW5nZXMsIHN1bXkvY2hhbmdlcyk7XG5cbiAgICAvLyBjb250ZXh0LnB1dEltYWdlRGF0YShwcm9jZXNzZWRJbWFnZURhdGEsIDAsIDApO1xufVxuXG5mdW5jdGlvbiBpbmRleFRvQ29vcmRpbmF0ZXMoaW5kZXgsIHdpZHRoKSB7IC8vIHJlbWVtYmVyIHRoYXQgdGhlIGluZGV4IGlzIHIgZyBiIGEhISEgZml4IHRoaXMgZnVuY3Rpb25cbiAgICB2YXIgeSA9IE1hdGguZmxvb3IoaW5kZXggLyB3aWR0aCk7XG4gICAgdmFyIHggPSBpbmRleCAtICh5ICogd2lkdGgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBSYWRhcigpIHtcbiAgbGV0IGZwcyA9IDE2O1xuICBsZXQgcmFkYXIgPSBuZXcgT2JqZWN0KCk7XG4gIC8vIGxldCBjb21wYXJlciA9IG5ldyBJbWFnZUNvbXBhcmUoKTtcbiAgbGV0IHByZXZpb3VzRnJhbWU7XG5cblxuICByYWRhci5zdGFydCA9ICgpID0+IHtcbiAgICByYWRhci52aWRlbyA9IGdldFZpZGVvKCk7IC8vIGNoYW5nZSB0byBwcm9taXNlIGludGVyZmFjZT9cblxuICB9XG5cbiAgcmFkYXIuc3RhcnRMb29wID0gKCkgPT4ge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgbG9vcCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9vcCgpIHsgLy8gd2Ugc2hvdWxkIHBhc3MgaW4gdGltZSBkaWZmZXJlbmNlcz9cbiAgICBsZXQgY3VycmVudEZyYW1lID0gZ2V0VmlkZW9GcmFtZShyYWRhci52aWRlbyk7XG4gICAgcHJvY2VzcyhjdXJyZW50RnJhbWUsIHByZXZpb3VzRnJhbWUpO1xuXG4gICAgcHJldmlvdXNGcmFtZSA9IGN1cnJlbnRGcmFtZTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBsb29wKCk7XG4gICAgICB9KVxuICAgIH0sIDEwMDAgLyBmcHMpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzKGN1cnJlbnRGcmFtZSwgcHJldmlvdXNGcmFtZSkge1xuICAgIGlmIChwcmV2aW91c0ZyYW1lKSB7XG4gICAgICBsZXQgeHkgPSBjb21wYXJlKGN1cnJlbnRGcmFtZSwgcHJldmlvdXNGcmFtZSwgeHBpeGVscywgeXBpeGVscyk7XG5cbiAgICAgIGlmICh4eVswXSA+IDUwKXtcbiAgICAgICAgICBwb3NbMF0gPSB4eVsxXTtcbiAgICAgICAgICBwb3NbMV0gPSB4eVsyXTtcbiAgICAgICAgLy8gICBwb3NbMF0gPSB4eVsxXSAvIHlwaXhlbHNcbiAgICAgICAgLy8gICBwb3NbMV0gPSB4eVsyXSAvIHhwaXhlbHNcbiAgICAgICAgfVxuICAgICAgICAvLyBjb250ZXh0LnB1dEltYWdlRGF0YShwcm9jZXNzZWRJbWFnZURhdGEsIHBvc1swXSwgcG9zWzFdKTtcbiAgICAgICAgY29uc29sZS5sb2cocG9zKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChwb3NbMF0sIHBvc1sxXSwgMjAsIDIwKTtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHh5KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmFkYXI7XG59XG5cbm1haW4oKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==