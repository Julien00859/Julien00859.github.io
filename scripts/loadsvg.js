const obj = document.createElement("object");
obj.innerHTML = `<svg version="1.1"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
width="32"
height="50">
<defs/>
<g>
   <path fill="none"
         stroke="none"/>
   <text stroke="none"
         font-family="sans-serif"
         font-size="50px"
         font-style="normal"
         font-weight="normal"
         text-decoration="normal"
         x="0"
         y="42"
         text-anchor="start"
         dominant-baseline="alphabetic">
         
   </text>
</g>
</svg>`

function createSVGFromText(text) {
    const svg_text = obj.cloneNode(true);
    svg_text.firstChild.getElementsByTagName("text")[0].textContent = text;
    return svg_text;
}

SVGNumbers = [
    createSVGFromText("1"),
    createSVGFromText("2"),
    createSVGFromText("3"),
    createSVGFromText("4"),
    createSVGFromText("5"),
    createSVGFromText("6"),
    createSVGFromText("7"),
    createSVGFromText("8"),
    createSVGFromText("9")
];
