window.onload = _ => {
	const bigimgdiv = document.getElementById("bigimg-div");
	const bigviddiv = document.getElementById("bigvid-div");
	console.log(bigviddiv)
	const bigimg = document.getElementById("bigimg");
	bigimgdiv.onclick = _ => {
		bigimgdiv.style.display = "none";
	}
	const thumbnails = document.getElementsByClassName("thumbnail");
	Array.prototype.forEach.call(thumbnails, ele => {
		ele.onclick = _ => {
			src = ele.getAttribute("src").replace("-thumbnail", "");
			bigimg.setAttribute("src", src);
			bigimgdiv.style.display = "block";
		}
	})
	const thumbnails_vid = document.getElementsByClassName("video-thumbnail");
	Array.prototype.forEach.call(thumbnails_vid, ele => {
		ele.onclick = _ => {
			src = (/https:\/\/img\.youtube\.com\/vi\/(.*?)\/0\.jpg/).exec(ele.getAttribute("src"))[1];
			console.log(src)
			bigviddiv.innerHTML = `<iframe width="720" height="405" src="https://www.youtube.com/embed/${src}?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
			bigviddiv.style.display = "block";
			setTimeout(function() {window.onclick = _ => {
				window.onclick = null;
				bigviddiv.removeChild(bigviddiv.firstChild);
				bigviddiv.style.display = "none";
			}}, 0)
		}
	})
}