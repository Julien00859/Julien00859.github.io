var ip;
var addressMatcher = new RegExp("((0|[1-9][0-9]{0,2})\.){3}(0|[1-9][0-9]{0,2})");

function IPv4(address, mask) {
	if (typeof address !== "string") throw "Invalid address type";
	if (!addressMatcher.test(address)) throw "Invalid address value";
	if (typeof mask !== "number") throw "Invalid mask type";
	if (mask < 0 || mask > 32) throw "Mask must be between 0 and 32";


	var splitedAddress = address.split(".").map(x => parseInt(x));
	this.address = 0;
	for (var n=0; n<4; n++) {
		if (splitedAddress[n] > 255) throw "Address values must be between 0 and 255";
		this.address += splitedAddress[n] << (8 * (3 - n));
	}

	this.mask = ~0 << (32 - mask);
	this.network = this.address & this.mask;
	this.broadcast = this.network | ~this.mask;
}

function IPToString(addr) {
	var splitedAddress = [];
	for (var n = 0; n < 4; n++)
		splitedAddress.push(addr << n * 8 >>> 24);
	return splitedAddress.join(".");
}

function IPToBinary(addr) {
	return (addr >>> 0).toString(2)
}

function maskToSlash(mask) {
	var slash = 0;
	for (var n = 0; n < 32; n++)
		slash += (mask >>> n) % 2;
	return slash;
}

function changeDisplay(type) {
	toShow = document.getElementsByClassName(type == "bin" ? "bin" : "text")
	toHide = document.getElementsByClassName(type == "text" ? "bin" : "text")
	for (var i = 0; i < toShow.length; i++) {
		toHide[i].setAttribute("hidden", true);
		toShow[i].removeAttribute("hidden");
	}
}

function main() {
	document.frm.addEventListener("submit", function(event) {
		event.preventDefault();
		ip = new IPv4(document.frm.addressText.value, +document.frm.maskNum.value);
		document.frm.addressBin.value = IPToBinary(ip.address);
		document.frm.maskBin.value = IPToBinary(ip.mask);
		document.frm.networkBin.value = IPToBinary(ip.network);
		document.frm.broadcastBin.value = IPToBinary(ip.broadcast);
		document.frm.maskText.value = IPToString(ip.mask)
		document.frm.networkText.value = IPToString(ip.network);
		document.frm.broadcastText.value = IPToString(ip.broadcast);
	});

	document.frm.rtext.addEventListener("change", function(event){
		changeDisplay("text");
	});

	document.frm.rbin.addEventListener("change", function(event){
		changeDisplay("bin");
	});
}
