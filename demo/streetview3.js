let panorama
let head = 34
let pit = 10
let zoo = 0

let x,y,z

function initialize() {
	var fenway = {lat: 42.345573, lng: -71.098326};
	var latitude = 42.345573;
	var longitude = -71.098326;
    var fenway = {lat: latitude, lng: longitude};
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   center: fenway,
    //   zoom: 14
    // });
    panorama = new google.maps.StreetViewPanorama(
	    document.getElementById('pano'), {

	      position: fenway,
	      pov: {
	        heading: head,
	        pitch: pit
	      }
		//   fullscreenControl: true
	    });
	// StreetViewPanorama(container:Element, opts?:StreetViewPanoramaOptions)

}

function pan(num, num2){
	head += num * .5
	pit += num2 * .5
	panorama.setPov({
		heading:head,pitch:pit
	})
}

function zoom(num){
	zoo += num
	if (zoo < 0) {
		zoo = 0
	}
	zoo = zoo * .5
	panorama.setZoom(zoo + 1)
}

function update(nx,ny,nz) {

	// dx = (nx - x)*(nx - x)
	// dy = (ny - y)*(ny - y)
	// dz = (nz - z)*(nz - z)
	//
	// if (((dx < 100) && (dy < 100) && (dz < 100) )&&(x && y && z)) {
	if (x && y && z) {
		pan(nx - x, ny - y)
		zoom(nz - z)

	}
	x = nx
	y = ny
	z = nz

}
