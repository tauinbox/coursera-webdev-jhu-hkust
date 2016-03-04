var field1 = document.getElementById("leftside");
var field2 = document.getElementById("rightside");
var wrong = document.getElementById("gamefield");
var img = [];
var faces = 5;
var idx = 0;
var smile;
var missed, guessed;

// function do_game() {
// 	generate_faces(faces);
// }

function do_game() {
	img.length = faces;

	function correct_pos(object) {
		object.style.left = Math.floor(Math.random() * (field1.offsetWidth - object.width)) + "px";
		object.style.top = Math.floor(Math.random() * (field1.offsetHeight - object.height)) + "px";
		console.log("position: " + object.style.left + " x " + object.style.top);
		console.log("field1 width: " + field1.offsetWidth + ", image width:" + object.width);
		console.log("field1 height: " + field1.offsetHeight + ", image height:" + object.height);
		field1.appendChild(object);
	}

	// function sleep(ms) {
	// 	ms += new Date().getTime();
	// 	while (new Date() < ms){}
	// } 

	for (var i = 0; i < img.length; i++ ) {

		img[i] = document.createElement("img");
		img[i].style.position = "absolute";
		img[i].src = "smile.png";
		picture = img[i];

		img[i].addEventListener("load", function(object) {
        									return function a() {
        											idx++;
        											object.removeEventListener("load", a);
       									 			correct_pos(object);
        									 		if (idx == faces) {
        									 			idx = 0;
        									 			clone_right();
        									 		}
        									}
        								}(img[i]));
	}

	function clone_right() {
		// debugger;
		var clone = field1.cloneNode(true);
		clone.removeChild(clone.lastChild);
		field2.appendChild(clone);
		smile = field1.lastChild;
		setEvent("click", missed, wrong);		
		setEvent("click", guessed, smile);
	}
}

guessed = function() {
			removeEvent("click", missed, wrong);
			faces += 5;
			while (field1.firstChild) {
				field1.removeChild(field1.firstChild);
			}
			while (field2.firstChild) {
				field2.removeChild(field2.firstChild);
			}
			delete img;
			do_game();
			// stopPropagation();
}

missed = function() {
	alert("Game over!");
	smile.style.backgroundColor = "red";
	removeEvent("click", guessed, smile);
	removeEvent("click", missed, wrong);
}

setEvent = function(event, handler, object) {
	object.addEventListener(event, handler);
}

removeEvent = function(event, handler, object) {
	object.removeEventListener(event, handler);
}