let heading, pitch, zoom
heading = 34
pitch = 10
zoom = 1
let prevx, prevy, prevz
let panorama



function initialize() {
		var latitude = 42.345573;
		var longitude = -71.098326;
        var fenway = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: fenway,
          zoom: 14
        });
        panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
              position: fenway,
              pov: {
                heading: heading,
                pitch: pitch
              }
            });
        map.setStreetView(panorama);
      }



function updatePosition(x,y,z){
	if !(prevx || prevy || prevz) {
		prevx = x
		prevy = y
		prevz = z
	}
	let xShift = prevx - x;
	let yShift = prevy - y;
	let zShift = prevz - z;
	prevx = x
	prevy = y
	prevz = z
	panorama.setPov({
		heading: xshift * 5,
		pitch: this.yShift * 5,
		zoom: zoom * 2
	});
}



