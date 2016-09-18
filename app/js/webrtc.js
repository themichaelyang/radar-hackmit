'use strict';

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
  var caller = new Object();

  caller.call = function () {
    var connection = peer.connect('callee');
    connection.on('data', function (data) {
      console.log(data);
    });
  };

  return caller;
}

function Callee() {
  var callee = new Object();
  var peer = new Peer('callee', { key: 'lhlz7j58jh71ra4i' });

  callee.listen = function () {
    return new Promise(function (resolve, reject) {
      peer.on('connect', function (connection) {
        callee.connection = connection;
        resolve(connection);
      });
    });
  };

  callee.send = function (data) {
    if (callee.connection) {
      callee.connection.send(data);
    }
  };

  return callee;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnJ0Yy5qcyJdLCJuYW1lcyI6WyJDYWxsZXIiLCJjYWxsZXIiLCJPYmplY3QiLCJjYWxsIiwiY29ubmVjdGlvbiIsInBlZXIiLCJjb25uZWN0Iiwib24iLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsIkNhbGxlZSIsImNhbGxlZSIsIlBlZXIiLCJrZXkiLCJsaXN0ZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlbmQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTQSxNQUFULEdBQWtCO0FBQ2hCLE1BQUlDLFNBQVMsSUFBSUMsTUFBSixFQUFiOztBQUVBRCxTQUFPRSxJQUFQLEdBQWMsWUFBVztBQUN2QixRQUFJQyxhQUFhQyxLQUFLQyxPQUFMLENBQWEsUUFBYixDQUFqQjtBQUNBRixlQUFXRyxFQUFYLENBQWMsTUFBZCxFQUFzQixnQkFBUTtBQUM1QkMsY0FBUUMsR0FBUixDQUFZQyxJQUFaO0FBQ0QsS0FGRDtBQUdELEdBTEQ7O0FBT0EsU0FBT1QsTUFBUDtBQUNEOztBQUVELFNBQVNVLE1BQVQsR0FBa0I7QUFDaEIsTUFBSUMsU0FBUyxJQUFJVixNQUFKLEVBQWI7QUFDQSxNQUFJRyxPQUFPLElBQUlRLElBQUosQ0FBUyxRQUFULEVBQW1CLEVBQUNDLEtBQUssa0JBQU4sRUFBbkIsQ0FBWDs7QUFFQUYsU0FBT0csTUFBUCxHQUFnQixZQUFXO0FBQ3pCLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q2IsV0FBS0UsRUFBTCxDQUFRLFNBQVIsRUFBbUIsVUFBQ0gsVUFBRCxFQUFnQjtBQUNqQ1EsZUFBT1IsVUFBUCxHQUFvQkEsVUFBcEI7QUFDQWEsZ0JBQVFiLFVBQVI7QUFDRCxPQUhEO0FBSUQsS0FMTSxDQUFQO0FBTUQsR0FQRDs7QUFTQVEsU0FBT08sSUFBUCxHQUFjLFVBQVNULElBQVQsRUFBZTtBQUMzQixRQUFJRSxPQUFPUixVQUFYLEVBQXVCO0FBQ3JCUSxhQUFPUixVQUFQLENBQWtCZSxJQUFsQixDQUF1QlQsSUFBdkI7QUFDRDtBQUNGLEdBSkQ7O0FBTUEsU0FBT0UsTUFBUDtBQUNEIiwiZmlsZSI6IndlYnJ0Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGZ1bmN0aW9uIENhbGxlcigpIHtcbi8vICAgbGV0IGNhbGxlciA9IG5ldyBPYmplY3QoKTtcbi8vICAgbGV0IGNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oKTtcbi8vXG4vLyAgIGNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSAoZXZlbnQpID0+IHsgLy8gdHJpY2tsZSBpY2UgY2FuZGlkYXRlc1xuLy8gICAgIGxldCBjYW5kaWRhdGUgPSBldmVudC5jYW5kaWRhdGU7XG4vLyAgICAgaWYgKGNhbmRpZGF0ZSkge1xuLy8gICAgICAgLy8gc2VuZCBpY2UgY2FuZGlkYXRlXG4vLyAgICAgfVxuLy8gICAgIGVsc2Uge1xuLy8gICAgICAgLy8gbm8gbW9yZSBpY2UgY2FuZGlkYXRlXG4vLyAgICAgfVxuLy8gICB9XG4vL1xuLy8gICBjYWxsZXIuY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGxldCBjcmVhdGVPZmZlclByb21pc2UgPSBjb25uZWN0aW9uLmNyZWF0ZU9mZmVyKCk7XG4vLyAgICAgY3JlYXRlT2ZmZXJQcm9taXNlLnRoZW4ob2ZmZXIgPT4gY29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKSk7XG4vL1xuLy8gICB9XG4vL1xuLy8gICByZXR1cm4gY2FsbGVyO1xuLy8gfVxuLy9cbi8vIGZ1bmN0aW9uIENhbGxlZSgpIHtcbi8vICAgbGV0IGNhbGxlZSA9IG5ldyBPYmplY3QoKTtcbi8vICAgbGV0IGNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oKTtcbi8vXG4vLyAgIGZ1bmN0aW9uIHJlY2lldmVJY2VDYW5kaWRhdGUoKSB7XG4vL1xuLy8gICB9XG4vL1xuLy8gfVxuXG4vLyB1c2UgYSBsaWJyYXJ5IGluc3RlYWQgbG9sXG5cbmZ1bmN0aW9uIENhbGxlcigpIHtcbiAgbGV0IGNhbGxlciA9IG5ldyBPYmplY3QoKTtcblxuICBjYWxsZXIuY2FsbCA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBjb25uZWN0aW9uID0gcGVlci5jb25uZWN0KCdjYWxsZWUnKTtcbiAgICBjb25uZWN0aW9uLm9uKCdkYXRhJywgZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBjYWxsZXI7XG59XG5cbmZ1bmN0aW9uIENhbGxlZSgpIHtcbiAgbGV0IGNhbGxlZSA9IG5ldyBPYmplY3QoKTtcbiAgbGV0IHBlZXIgPSBuZXcgUGVlcignY2FsbGVlJywge2tleTogJ2xobHo3ajU4amg3MXJhNGknfSk7XG5cbiAgY2FsbGVlLmxpc3RlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBwZWVyLm9uKCdjb25uZWN0JywgKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgY2FsbGVlLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgICAgICByZXNvbHZlKGNvbm5lY3Rpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjYWxsZWUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoY2FsbGVlLmNvbm5lY3Rpb24pIHtcbiAgICAgIGNhbGxlZS5jb25uZWN0aW9uLnNlbmQoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNhbGxlZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
