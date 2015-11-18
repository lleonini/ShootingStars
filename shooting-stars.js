/* Simple Shooting Star JS
 * Copyleft 2015 Lorenzo Leonini
 * Require jQuery
 *
 * Usage:
 * ShootingStars.launch(1000, "#container");
 * 
 */
'use strict';

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var ShootingStars = {

	addPoint: function (starPoint) {
		var divId = "star" + starPoint.id + "-" + starPoint.n;
		$(starPoint.container).append(
				"<div id='" + divId + "' style='" +
				"position: absolute;" +
				"left: " + starPoint.x + "px;" +
				"top: " + starPoint.y + "px;" +
				"width: " + starPoint.size + "px;" +
				"height: " + starPoint.size + "px;" +
				"background-color: " + starPoint.color + ";" +
				"opacity: 1;" +
				"box-shadow: 0px 0px 8px 1px rgba(255, 255, 255, 0.3);" +
				"'></div>");

		$("#" + divId).animate({opacity: 0}, 1000, "linear", function() { $(this).remove(); });
	},

	// Prepare the star to launch
	launchStar: function (container, id) {
		var width = $(container).width();
		var height = $(container).height();

		// direction
		// always +-45, up/down
		//var xd = (rand(0, 1)) ? 1 : -1;
		//var yd = (rand(0, 1)) ? 1 : -1;
		// => only one direction is more beautiful
		var xd = 1, yd = 1;

		//var size = rand(1, 2);
		var size = 1;

		var color = "#fff";

		// smaller is faster
		var speed = 5;

		// trail length
		var length = rand(200, 500);

		// start position
		var x = rand(0.1 * width, 0.9 * width);
		var y = rand(0.1 * height, 0.9 * height);

		//console.log("Star x: " + x + " y: " + y + " size: " + size + " length: " + length);

		for (var n = 0; n < length; n++) {
			// stop drawing if we reach the container's limit
			if (!(x >= 0 + size - 1  && x <= width - size && y >= 0 + size - 1 && y <= height - size)) break;

			setTimeout(this.addPoint, n * speed, {
				id: id,
				container: container,
				n: n,
				size: size,
				color: color,
				x: x,
				y: y
			});
			x += xd;
			y += yd;
		}
	},

	launch: function (interval, container, obj, id) {
		obj = obj || this;
		id = id + 1 || 1;
		obj.launchStar(container, id);
		setTimeout(obj.launch, interval, interval, container, obj, id);
	}
}
