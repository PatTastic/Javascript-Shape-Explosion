var dirs = {classes: [], top: [], right: [], bottom: [], left: []};
var tooMuch = false;
$("document").ready(function() {
	for(var i=0; i<100; i++){
    	dirs.classes.push(Math.floor(Math.random() * 100 + 1));
        dirs.top.push(Math.floor(Math.random() * 200 + 10));
        dirs.right.push(Math.floor(Math.random() * 200 + 10));
        dirs.bottom.push(Math.floor(Math.random() * 200 + 10));
        dirs.left.push(Math.floor(Math.random() * 200 + 10));
    }
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
            elems += "<div class='hex dir-1'></div>"
        }
        elems += "</div>";

        div.append(elems);
        $(document.body).append(div);

        setTimeout(function() {
            $("#" + id).remove();
        }, 2000);
    }
});
