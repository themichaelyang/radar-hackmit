'use strict';

function main() {
  var r = Radar();

  var peer = new Peer('callee', { secure: true, host: '18.22.8.82', port: 9000, path: '/' });
  peer.on('connection', function (conn) {
    r.start();

    window.setTimeout(function () {
      r.startLoop(function () {
        conn.send(r.getCoords());
      });
    }, 500); // absolute trash, please use promises next time
    conn.on('data', function (data) {
      alert(data);
    });
  });
}

window.onload = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob25lLmpzIl0sIm5hbWVzIjpbIm1haW4iLCJyIiwiUmFkYXIiLCJwZWVyIiwiUGVlciIsInNlY3VyZSIsImhvc3QiLCJwb3J0IiwicGF0aCIsIm9uIiwiY29ubiIsInN0YXJ0Iiwid2luZG93Iiwic2V0VGltZW91dCIsInN0YXJ0TG9vcCIsInNlbmQiLCJnZXRDb29yZHMiLCJkYXRhIiwiYWxlcnQiLCJvbmxvYWQiXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBU0EsSUFBVCxHQUFnQjtBQUNkLE1BQUlDLElBQUlDLE9BQVI7O0FBRUEsTUFBSUMsT0FBTyxJQUFJQyxJQUFKLENBQVMsUUFBVCxFQUFtQixFQUFDQyxRQUFRLElBQVQsRUFBZUMsTUFBTSxZQUFyQixFQUFtQ0MsTUFBTSxJQUF6QyxFQUErQ0MsTUFBTSxHQUFyRCxFQUFuQixDQUFYO0FBQ0FMLE9BQUtNLEVBQUwsQ0FBUSxZQUFSLEVBQXNCLFVBQVNDLElBQVQsRUFBZTtBQUNuQ1QsTUFBRVUsS0FBRjs7QUFFQUMsV0FBT0MsVUFBUCxDQUFrQixZQUFJO0FBQ3BCWixRQUFFYSxTQUFGLENBQVksWUFBTTtBQUNoQkosYUFBS0ssSUFBTCxDQUFVZCxFQUFFZSxTQUFGLEVBQVY7QUFDRCxPQUZEO0FBR0EsS0FKRixFQUlJLEdBSkosRUFIbUMsQ0FPekI7QUFDVk4sU0FBS0QsRUFBTCxDQUFRLE1BQVIsRUFBZ0IsVUFBU1EsSUFBVCxFQUFlO0FBQzdCQyxZQUFNRCxJQUFOO0FBQ0QsS0FGRDtBQUdGLEdBWEE7QUFZRDs7QUFFREwsT0FBT08sTUFBUCxHQUFnQm5CLElBQWhCIiwiZmlsZSI6InBob25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbWFpbigpIHtcbiAgbGV0IHIgPSBSYWRhcigpO1xuXG4gIGxldCBwZWVyID0gbmV3IFBlZXIoJ2NhbGxlZScsIHtzZWN1cmU6IHRydWUsIGhvc3Q6ICcxOC4yMi44LjgyJywgcG9ydDogOTAwMCwgcGF0aDogJy8nfSk7XG4gIHBlZXIub24oJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbihjb25uKSB7XG4gICAgci5zdGFydCgpO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCk9PntcbiAgICAgIHIuc3RhcnRMb29wKCgpID0+IHtcbiAgICAgICAgY29ubi5zZW5kKHIuZ2V0Q29vcmRzKCkpO1xuICAgICAgfVxuICAgICl9LCA1MDApOyAvLyBhYnNvbHV0ZSB0cmFzaCwgcGxlYXNlIHVzZSBwcm9taXNlcyBuZXh0IHRpbWVcbiAgICBjb25uLm9uKCdkYXRhJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgYWxlcnQoZGF0YSk7XG4gICAgfSk7XG4gfSk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBtYWluO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9