var elems = "<div id='explosion-container'>";
for(var i=0; i<20; i++){
    elems += "<div class='hex'></div>"
}
elems += "</div>";

$("html").click(function(e){
	var id = Math.floor(Math.random()*89999+10000);
	var x = (e.pageX - (25/2)) + 'px';
    var y = (e.pageY - (25/2)) + 'px';
    var div = $("<div id='" + id + "'>").css({
        "position": "absolute",                    
        "left": x,
        "top": y
    });
    
    div.append(elems);
    $(document.body).append(div);   
});