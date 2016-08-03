var turnNum = [0, 0, 0, 0, 0, 0];

for(var i = 1; i <= 2; i++) {
	$(".page" + i).attr("pageNum", i);
	$(".page" + i).on("click", function() {
		var v = $(this).attr("pageNum");
		console.log(v);
		if(turnNum[v - 1] == 0) {
			turnNum[v - 1] = 1;
			$(".page" + v).css({
				"transform": "rotateY(180deg)"
			});
			$(".page" + v + "First").fadeOut(1000);
			setTimeout(function() {
				$(".page" + v).css({
					"zIndex": v
				});
				$(".page" + v + "Second").show();
			}, 1000)
		} else {
			turnNum[v - 1] = 0;
			$(".page" + v).css({
				"transform": "rotateY(0)",
				"zIndex": 20 - v
			});
			setTimeout(function() {
				$(".page" + v + "First").fadeIn(1);
				$(".page" + v + "Second").hide();
			}, 1000)
		}
	})
}