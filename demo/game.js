var cursor;
var duck = [];
var score;

function startGame(){
	myGameArea.start();
	cursor = new component(30,30,'red',500,500);
	score = new component("200px", "Consolas","black",50,50,"text");
}

var myGameArea = {

	canvas : document.createElement('canvas'),
	start : function(){
		this.canvas.width = 1600;
		this.canvas.height = 700;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea,20);
		window.addEventListener('keydown', function(e){
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function(e){
			myGameArea.keys[e.keyCode] = false;
		})
	},
	clear : function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	},
	stop : function(){
		clearInterval(this.interval);
	}
}

function component(width,height,color,x,y,type){
	this.type = type;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function(){
		ctx = myGameArea.context;

		if(this.type == "text"){
			ctx.font = this.width;
			ctx.fillStyle = color;
			ctx.fillText(this.text,this.x, this.y)
		}

		else{
			ctx.fillStyle = color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}
	this.newPos = function(){
		this.x += this.speedX;
		this.y += this.speedY;
		this.hitBottom();
		this.hitTop();
		this.hitLeft();
		this.hitRight();
	}
	this.hitBottom = function(){
		var bottom = myGameArea.canvas.height - this.height;
		if(this.y>bottom){
			this.y = bottom;
		}
	}
	this.hitTop = function(){
		if(this.y<=0){
			this.y = 0;
		}
	}
	this.hitLeft = function(){
		if(this.x<=0){
			this.x = 0;
		}
	}
	this.hitRight = function(){
		var right = myGameArea.canvas.width - this.width;
		if(this.x > right){
			this.x = right;
		}
	}
	this.collision = function(otherobj){
		var crash = true;
		if((this.x+this.width) < (otherobj.x)
			|| (this.x) > (otherobj.x + otherobj.width)
			|| (this.y+this.height)<(otherobj.y)
			|| (this.y)>(otherobj.y + otherobj.height)){
			crash = false;
		}
		return crash;
	}
	this.disappear = function(){
		ctx.clearRect(x, y, width,height);
	}
}

function updateGameArea(){

	myGameArea.clear();

	for(i = 0; i<duck.length;i++){
		if(cursor.collision(duck[i]) && myGameArea.keys[32]){ //z
			myGameArea.context.clearRect(duck[i].x, duck[i].y, duck[i].width,duck[i].height);

			score.text = "SCORE:" + (i*5);

			return;
		}
	}

	cursor.speedX = 0;
	cursor.speedY = 0;

	if(myGameArea.keys && myGameArea.keys[37]){ //x
		cursor.speedX = -3;
	}
	if(myGameArea.keys && myGameArea.keys[38]){ //y
		cursor.speedY = -3;
	}
	if(myGameArea.keys && myGameArea.keys[39]){ //x 
		cursor.speedX = 3;
	}
	if(myGameArea.keys && myGameArea.keys[40]){ //y
		cursor.speedY = 3;
	}
	/*if(myGameArea.keys && myGameArea.keys[32]){
		cursor.width += 10;
	}
	if(myGameArea.keys && myGameArea.keys[37] && myGameArea.keys[32]){
		cursor.width += 10;
	}
	if(myGameArea.keys && myGameArea.keys[38] && myGameArea.keys[32]){
		cursor.width += 10;
	}
	if(myGameArea.keys && myGameArea.keys[39] && myGameArea.keys[32]){
		cursor.width += 10;
	}
	if(myGameArea.keys && myGameArea.keys[40] && myGameArea.keys[32]){
		cursor.width += 10;
	}*/

	myGameArea.frameNo += 1;
	if(myGameArea.frameNo == 1 || everyInterval(150)){
		//duck.push(new component(Math.floor((Math.random() * 1000) + 1),(Math.floor(Math.random() * 750) + 1),'green',30,30));
		duck.push(new component(30, 30, 'green', 0, Math.floor((Math.random()*600)+1)));
		//duck.push(new component(30, 30, 'green', myGameArea.canvas.width-30, Math.floor((Math.random()*500)+1)));
	}

	for(i = 1; i<duck.length; i++){
		duck[i].x += 3;
		duck[i].update();
	}
	for(i = 1; i<duck.length; i++){
		if(duck[i].x == myGameArea.canvas.width-30){
			myGameArea.stop();
		}
	}
	
	score.update();
	cursor.newPos();
	cursor.update();
}

function everyInterval(n){
	if((myGameArea.frameNo/n)%1 == 0){
		return true;
	}
	return false;
}