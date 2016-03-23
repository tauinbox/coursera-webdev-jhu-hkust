$(document).ready(function() {
	// assign tooltips
	$('[data-toggle="tooltip"]').tooltip();

	// change carousel cycle interval
    $("#mycarousel").carousel( { interval: 2000 } );

    // assign pause button on click event
    $("#carousel-pause").click(function(){
        $("#mycarousel").carousel('pause');
    });

    // assign play button on click event
    $("#carousel-play").click(function(){
        $("#mycarousel").carousel('cycle');
    });

    // assign Login button on click event to invoke modal
    $("#loginButton").click(function(){
    	$("#loginModal").modal('show');
    });

    // assign Reserve button on click event to invoke modal
    $("#reserveButton").click(function(){
    	$("#reserveModal").modal('show');
    });    
});
