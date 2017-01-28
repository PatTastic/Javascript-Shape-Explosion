var classes = [];
var tooMuch = false;

$("document").ready(function() {
	var dirs = {top: [], right: [], bottom: [], left: []};
	for(var i=0; i<100; i++){
    	classes.push(Math.floor(Math.random() * 100 + 1));
        dirs.top.push(Math.floor(Math.random() * 200 + 10));
        dirs.right.push(Math.floor(Math.random() * 200 + 10));
        dirs.bottom.push(Math.floor(Math.random() * 200 + 10));
        dirs.left.push(Math.floor(Math.random() * 200 + 10));
    }
    
    var styles = "<style>";
    for(var i=0; i<100; i++){
    	styles += ".dir-" + (i+1) + "{";
        styles += "animation-name: dir-" + (i+1) + ";}";
    }
    for(var i=0; i<100; i++){
    	var rand = {1: (Math.floor(Math.random() * 2 + 1)), 2: Math.floor(Math.random() * 100 + 1)};
    
    	styles += "@keyframes dir-" + (i+1) + "{";
        for(var j=0; j<2; j++){
        	if(j == 0){
            	styles += "0% {transform: rotate(0deg);";
            }
            else{
            	styles += "100% {transform: rotate(360deg);";
            }
            
            if(rand.1 == 1){
                styles += "top: " + dirs.top[i] + "px;";
            }
            else{
				styles += "bottom: " + dirs.bottom[i] + "px;";
            }
            if(rand.2 == 1){
				styles += "right: " + dirs.right[i] + "px;";
            }
            else{
				styles += "left: " + dirs.left[i] + "px;";
            }
            styles += "}";
        }
        styles += "}";
    }
    styles += "</style>";
    
    $(document.head).append(styles);
});

$("html").click(function(e) {
	if(!tooMuch){
        var id = Math.floor(Math.random() * 89999 + 10000);
        var x = (e.pageX - (25 / 2)) + 'px';
        var y = (e.pageY - (25 / 2)) + 'px';
        var div = $("<div id='" + id + "'>").css({
            "position": "absolute",
            "left": x,
            "top": y
        });

        var elems = "<div id='explosion-container'>";
        for (var i = 0; i < 1; i++) {
            elems += "<div class='hex dir-";
            elems += Math.floor(Math.random() * 100 + 1);
            elems += "'></div>";
        }
        elems += "</div>";

        div.append(elems);
        $(document.body).append(div);

        setTimeout(function() {
            $("#" + id).remove();
        }, 2000);
    }
});
