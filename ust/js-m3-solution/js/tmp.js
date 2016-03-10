var field1 = document.getElementById("leftside");
var field2 = document.getElementById("rightside");

function do_game() {
	generate_faces();
}

function generate_faces() {
	var img;
	var loaded = false;

	correct_pos = function(object) {
		object.style.left = Math.floor(Math.random() * (field1.offsetWidth - object.width)) + "px";
		object.style.top = Math.floor(Math.random() * (field1.offsetWidth - object.height)) + "px";
		console.log("position: " + object.style.left + " x " + object.style.top);
		console.log("field1 width: " + field1.offsetWidth + ", image width:" + object.width);
		field1.appendChild(img);
	}

	img = document.createElement("img");
	img.style.position = "absolute";
	img.src = "smile.png";

	img.addEventListener("load", function() {
									correct_pos(img);
									img.removeEventListener("load", this);
								}	
	);	

}
