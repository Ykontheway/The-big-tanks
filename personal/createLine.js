function createLine(x1,y1,x2,y2,$obj,callback) {		
	var angle = Math.atan2(y1 - y2, x1 - x2) / 2 / Math.PI * 360;
	var lenght = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	
	var line = $("<p></p>");
	line.addClass("line");
	$obj.append(line);

	var lengthNum = 0;
	var lengthTimer = setInterval(function() {
		if(lengthNum < lenght) {
			lengthNum+=2;
			line.css({
				"left": x1 + "px",
				"top": y1 + "px",
				"transform": "rotate(" + (angle - 180) + "deg)",
				"width": lengthNum + "px"
			});
		} else {
			clearInterval(lengthTimer);
			callback();
		}
	},1)
}