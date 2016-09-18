function initialize() {
		var latitude = 42.345573;
		var longitude = -71.098326;
        var fenway = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: fenway,
          zoom: 14
        });
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
              position: fenway,
              pov: {
                heading: 34,
                pitch: 10
              }
            });
        map.setStreetView(panorama);
      }



function(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
	this.xShift = 0;
	this.yShift = 0;
	this.zShift = 0;
	panorama.setPov({
		heading: (this.x+=this.xShift);
		pitch: (this.y+=this.yShift);
		zoom: (1+=this.zShift);
	});
	panorama.setPosition(new google.maps.LatLng(lat: latitude + zShift, lng: longitude+zShift)); //not sure about this. maybe stick to z for zooming
}



