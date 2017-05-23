Number.prototype.toFixedRight = function(length) {
	str = "" + this;
	while(str.length < length) {
		str = "0" + str;
	}
	return str;
}
function log(text) {
	document.getElementById("log").innerHTML += "<p><code>" + text + "</code></p>";
}
function segment(x, y, type) {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(50,50);
	ctx.lineTo(50 + x, 50 + y);
	ctx.closePath();
	switch (type) {
		case "seconds":
		ctx.lineWidth = 1;
		break;
		case "minutes":
		ctx.lineWidth = 2;
		break;
		case "hours":
		ctx.lineWidth = 3;
	}
	ctx.stroke();
}

function tick() {
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	document.getElementById("time24").textContent = h.toFixedRight(2) + ":" + m.toFixedRight(2) + ":" + s.toFixedRight(2);
	document.getElementById("timeAMPM").textContent = (h%12).toFixedRight(2) + ":" + m.toFixedRight(2) + ":" + s.toFixedRight(2) + " " + {0:"AM", 1:"PM"}[Math.floor(h/12)];

	var hRad = (h%12 / 6 + m / 30 /60) * Math.PI - Math.PI/2;
	var mRad = (m / 30 + s / 30 / 60) * Math.PI - Math.PI/2;
	var sRad = s / 30 * Math.PI - Math.PI/2;

	ctx = document.getElementById("canvas").getContext("2d")
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.arc(50,50,49,0,Math.PI*2,true);
	for(var i = 0; i < 12; i++) {
	ctx.moveTo(50 + Math.cos(i * Math.PI / 6) * 50, 50 + Math.sin(i * Math.PI / 6) * 50);
	ctx.lineTo(50 + Math.cos(i * Math.PI / 6) * 45, 50 + Math.sin(i * Math.PI / 6) * 45);
	}
	ctx.stroke();
	ctx.closePath();

	segment(Math.cos(hRad) * 30, Math.sin(hRad) * 30, "hours");
	segment(Math.cos(mRad) * 40, Math.sin(mRad) * 40, "minutes");
	segment(Math.cos(sRad) * 45, Math.sin(sRad) * 45, "seconds");
}

function main() {
	setInterval(tick, 1000);
}
