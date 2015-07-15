$.event.props = $.event.props.join('|').replace('layerX|layerY|', '').split('|');

var INTERVAL = 20
var STAR_COUNT = 400

var canvas, context, timer


var fade = 255
var stars = new Array(STAR_COUNT)

$(document).ready(function() {
    canvas = document.getElementById('background')
    context = canvas.getContext('2d')

    $(document).mousemove(function(e){
	$('#pizza_cursor').css({
	    left:  e.clientX - 5,
	    top:   e.clientY - 5
	});
    });

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    $('#pizza_button').click(function() {
	_gaq.push(['_trackEvent', 'Button', 'Clicked', 'Pizza Button']);
	initDraw()
    })
});

function initStars() {
    for(var i = 0; i < STAR_COUNT; i++){
	stars[i] = new Star()
    }
}

function initDraw() {
    fade = 255

    $('h3').css('color', '#fff')

    initStars()

    window.clearInterval(timer)
    timer = window.setInterval(draw,INTERVAL)
}

function draw(){
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    if (fade > 1) {
	fade = (fade - 10) % 255
    }

    context.fillStyle = "rgb("+fade+","+fade+","+fade+")"
    context.fillRect(0,0,canvas.width,canvas.height)

    for(var i = 0; i < STAR_COUNT; i++){
	stars[i].draw()
    }
}

function Star() {
    var H = canvas.width / 2
    var V = canvas.height / 2

    this.x = (Math.random()*canvas.width) - H
    this.y = (Math.random()*canvas.height) - V

    if((this.x == 0) && (this.y == 0)) x = 10

    this.z = Math.random()*100;
    this.depth = 1
    this.alpha = 0

    this.draw = function() {
	//update here
	var hh,vv,X,Y,h,v
	var rot = 0;
	this.z = this.z - 2
	if( this.z < -63 ) z = 100
	hh = (this.x*64)/(64+this.z)
	vv = (this.y*64)/(64+this.z)
	X = (hh*Math.cos(rot))-(vv*Math.sin(rot))
	Y = (hh*Math.sin(rot))+(vv*Math.cos(rot))
	h = X + H
	v = Y + V
	if( (h < 0) || (h > (2*H))) this.z = 100
	if( (v < 0) || (v > (2*H))) this.z = 100

	context.font = "bold 12px sans-serif"
	context.fillStyle = "#fff"
	context.fillText(".",h,v)
    }

}

//to do....
function Background () {
    this.state = none
    this.color = 0
}
