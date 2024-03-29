'use strict';

var displayCanvasContext = void 0;

function ImageCompare() {

    var sensitivity = 100;

    // let destCanvas = document.createElement('canvas')
    //
    // var destCtx = destCanvas.getContext('2d');

    function compare(tempCanvas1, tempCanvas2, width, height) {

        // tempCanvas1.drawImage(image1, 0, 0, width, height);
        // tempCanvas2.drawImage(image2, 0, 0, width, height);
        // destCtx.drawImage(tempCanvas1, 0, 0);

        var highlight = new ImageData(1, 1);

        var sumx = 0;
        var sumy = 0;
        var changes = 0;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var pixel1 = tempCanvas1.getImageData(x, y, 1, 1);
                var pixel2 = tempCanvas2.getImageData(x, y, 1, 1);

                displayCanvasContext.putImageData(highlight, x, y);

                // console.log(tempCanvas2.getImageData(x, y, 1, 1));
                if (comparepixel(pixel1.data, pixel2.data)) {
                    sumx += x;
                    sumy += y;
                    changes += 1;
                }
            }
        }

        var location = [sumx / changes, sumy / changes];

        return location;

        function comparepixel(p1data, p2data) {

            var diff = false;
            var dr = void 0,
                dg = void 0,
                db = void 0;
            dr = p1data[0] - p2data[0];
            dg = p1data[1] - p2data[1];
            db = p1data[2] - p2data[2];

            // let distance = Math.sqrt( dr * dr + dg * dg + db * db );

            if (distance < sensitivity) {
                diff = true;
            }
            return diff;
        }
    }

    return {
        compare: compare
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkltYWdlQ29tcGFyZS5qcyJdLCJuYW1lcyI6WyJkaXNwbGF5Q2FudmFzQ29udGV4dCIsIkltYWdlQ29tcGFyZSIsInNlbnNpdGl2aXR5IiwiY29tcGFyZSIsInRlbXBDYW52YXMxIiwidGVtcENhbnZhczIiLCJ3aWR0aCIsImhlaWdodCIsImhpZ2hsaWdodCIsIkltYWdlRGF0YSIsInN1bXgiLCJzdW15IiwiY2hhbmdlcyIsIngiLCJ5IiwicGl4ZWwxIiwiZ2V0SW1hZ2VEYXRhIiwicGl4ZWwyIiwicHV0SW1hZ2VEYXRhIiwiY29tcGFyZXBpeGVsIiwiZGF0YSIsImxvY2F0aW9uIiwicDFkYXRhIiwicDJkYXRhIiwiZGlmZiIsImRyIiwiZGciLCJkYiIsImRpc3RhbmNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFJQSw2QkFBSjs7QUFFQSxTQUFTQyxZQUFULEdBQXdCOztBQUVwQixRQUFJQyxjQUFjLEdBQWxCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxhQUFTQyxPQUFULENBQWlCQyxXQUFqQixFQUE4QkMsV0FBOUIsRUFBMkNDLEtBQTNDLEVBQWtEQyxNQUFsRCxFQUEwRDs7QUFFdEQ7QUFDQTtBQUNBOztBQUVBLFlBQUlDLFlBQVksSUFBSUMsU0FBSixDQUFjLENBQWQsRUFBZ0IsQ0FBaEIsQ0FBaEI7O0FBRUEsWUFBSUMsT0FBTyxDQUFYO0FBQ0EsWUFBSUMsT0FBTyxDQUFYO0FBQ0EsWUFBSUMsVUFBVSxDQUFkOztBQUdBLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJUCxLQUFwQixFQUEyQk8sR0FBM0IsRUFBaUM7QUFDN0IsaUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJUCxNQUFwQixFQUE0Qk8sR0FBNUIsRUFBa0M7QUFDOUIsb0JBQUlDLFNBQVNYLFlBQVlZLFlBQVosQ0FBeUJILENBQXpCLEVBQTRCQyxDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxDQUFiO0FBQ0Esb0JBQUlHLFNBQVNaLFlBQVlXLFlBQVosQ0FBeUJILENBQXpCLEVBQTRCQyxDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxDQUFiOztBQUVBZCxxQ0FBcUJrQixZQUFyQixDQUFrQ1YsU0FBbEMsRUFBNkNLLENBQTdDLEVBQWdEQyxDQUFoRDs7QUFFQTtBQUNBLG9CQUFJSyxhQUFhSixPQUFPSyxJQUFwQixFQUEwQkgsT0FBT0csSUFBakMsQ0FBSixFQUE0QztBQUN4Q1YsNEJBQVFHLENBQVI7QUFDQUYsNEJBQVFHLENBQVI7QUFDQUYsK0JBQVcsQ0FBWDtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxZQUFJUyxXQUFXLENBQUNYLE9BQU9FLE9BQVIsRUFBaUJELE9BQU9DLE9BQXhCLENBQWY7O0FBRUEsZUFBT1MsUUFBUDs7QUFHSixpQkFBU0YsWUFBVCxDQUFzQkcsTUFBdEIsRUFBOEJDLE1BQTlCLEVBQXNDOztBQUVsQyxnQkFBSUMsT0FBTyxLQUFYO0FBQ0EsZ0JBQUlDLFdBQUo7QUFBQSxnQkFBUUMsV0FBUjtBQUFBLGdCQUFZQyxXQUFaO0FBQ0FGLGlCQUFNSCxPQUFPLENBQVAsSUFBWUMsT0FBTyxDQUFQLENBQWxCO0FBQ0FHLGlCQUFNSixPQUFPLENBQVAsSUFBWUMsT0FBTyxDQUFQLENBQWxCO0FBQ0FJLGlCQUFNTCxPQUFPLENBQVAsSUFBWUMsT0FBTyxDQUFQLENBQWxCOztBQUVBOztBQUVBLGdCQUFJSyxXQUFXMUIsV0FBZixFQUE0QjtBQUN4QnNCLHVCQUFPLElBQVA7QUFDSDtBQUNELG1CQUFPQSxJQUFQO0FBRUM7QUFDSjs7QUFFRCxXQUFPO0FBQ0hyQixpQkFBU0E7QUFETixLQUFQO0FBR0giLCJmaWxlIjoiSW1hZ2VDb21wYXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubGV0IGRpc3BsYXlDYW52YXNDb250ZXh0O1xuXG5mdW5jdGlvbiBJbWFnZUNvbXBhcmUoKSB7XG5cbiAgICBsZXQgc2Vuc2l0aXZpdHkgPSAxMDA7XG5cbiAgICAvLyBsZXQgZGVzdENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgLy9cbiAgICAvLyB2YXIgZGVzdEN0eCA9IGRlc3RDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGZ1bmN0aW9uIGNvbXBhcmUodGVtcENhbnZhczEsIHRlbXBDYW52YXMyLCB3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgICAgICAgLy8gdGVtcENhbnZhczEuZHJhd0ltYWdlKGltYWdlMSwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIC8vIHRlbXBDYW52YXMyLmRyYXdJbWFnZShpbWFnZTIsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAvLyBkZXN0Q3R4LmRyYXdJbWFnZSh0ZW1wQ2FudmFzMSwgMCwgMCk7XG5cbiAgICAgICAgbGV0IGhpZ2hsaWdodCA9IG5ldyBJbWFnZURhdGEoMSwxKVxuXG4gICAgICAgIGxldCBzdW14ID0gMDtcbiAgICAgICAgbGV0IHN1bXkgPSAwO1xuICAgICAgICBsZXQgY2hhbmdlcyA9IDA7XG5cblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4ICsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSArKykge1xuICAgICAgICAgICAgICAgIGxldCBwaXhlbDEgPSB0ZW1wQ2FudmFzMS5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG4gICAgICAgICAgICAgICAgbGV0IHBpeGVsMiA9IHRlbXBDYW52YXMyLmdldEltYWdlRGF0YSh4LCB5LCAxLCAxKTtcblxuICAgICAgICAgICAgICAgIGRpc3BsYXlDYW52YXNDb250ZXh0LnB1dEltYWdlRGF0YShoaWdobGlnaHQsIHgsIHkpO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGVtcENhbnZhczIuZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZXBpeGVsKHBpeGVsMS5kYXRhLCBwaXhlbDIuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VteCArPSB4O1xuICAgICAgICAgICAgICAgICAgICBzdW15ICs9IHk7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZXMgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9jYXRpb24gPSBbc3VteCAvIGNoYW5nZXMsIHN1bXkgLyBjaGFuZ2VzXTtcblxuICAgICAgICByZXR1cm4gbG9jYXRpb247XG5cblxuICAgIGZ1bmN0aW9uIGNvbXBhcmVwaXhlbChwMWRhdGEsIHAyZGF0YSkge1xuXG4gICAgICAgIGxldCBkaWZmID0gZmFsc2U7XG4gICAgICAgIGxldCBkciwgZGcsIGRiO1xuICAgICAgICBkciA9IChwMWRhdGFbMF0gLSBwMmRhdGFbMF0pO1xuICAgICAgICBkZyA9IChwMWRhdGFbMV0gLSBwMmRhdGFbMV0pO1xuICAgICAgICBkYiA9IChwMWRhdGFbMl0gLSBwMmRhdGFbMl0pO1xuXG4gICAgICAgIC8vIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydCggZHIgKiBkciArIGRnICogZGcgKyBkYiAqIGRiICk7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgc2Vuc2l0aXZpdHkpIHtcbiAgICAgICAgICAgIGRpZmYgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaWZmO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBjb21wYXJlXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
