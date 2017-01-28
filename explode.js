var explode = {classes: [], tooMuch: false, setup: {}};

explode.init = function(setup){
    explode.setup = setup;
};

$("document").ready(function() {
    var dirs = {
        top: [],
        right: [],
        bottom: [],
        left: []
    };
    for (var i = 0; i < 100; i++) {
        explode.classes.push(Math.floor(Math.random() * 100 + 1));
        dirs.top.push(Math.floor(Math.random() * 200 + 10));
        dirs.right.push(Math.floor(Math.random() * 200 + 10));
        dirs.bottom.push(Math.floor(Math.random() * 200 + 10));
        dirs.left.push(Math.floor(Math.random() * 200 + 10));
    }

    var styles = "<style>";
    for (var i = 0; i < 100; i++) {
        styles += ".dir-" + (i + 1) + "{";
        styles += "animation-name: dir-" + (i + 1) + ";}";
    }
    for (var i = 0; i < 100; i++) {
        var rand = {
            one: (Math.floor(Math.random() * 2 + 1)),
            two: Math.floor(Math.random() * 2 + 1)
        };

        styles += "@keyframes dir-" + (i + 1) + "{";
        for (var j = 0; j < 2; j++) {
            if (j == 0) {
                styles += "0% {transform: rotate(0deg);";
                if (rand.one == 1) { styles += "top: 0px;"; }
                else { styles += "bottom: 0px;"; }
                if (rand.two == 1) { styles += "right: 0px;"; }
                else { styles += "left: 0px;"; }
            }
            else {
                styles += "100% {transform: rotate(360deg);";
                
                if (rand.one == 1) {
                    styles += "top: " + dirs.top[i] + "px;";
                }
                else {
                    styles += "bottom: " + dirs.bottom[i] + "px;";
                }
                if (rand.two == 1) {
                    styles += "right: " + dirs.right[i] + "px;";
                } else {
                    styles += "left: " + dirs.left[i] + "px;";
                }
            }
            
            styles += "}";
        }
        styles += "}";
    }
    styles += "</style>";

    $(document.head).append(styles);
});

$(explode.explodeOn).click(function(e) {
    if (!explode.tooMuch) {
        var id = Math.floor(Math.random() * 89999 + 10000);
        var x = (e.pageX - (25 / 2)) + 'px';
        var y = (e.pageY - (25 / 2)) + 'px';
        var div = $("<div id='" + id + "'>").css({
            "position": "absolute",
            "left": x,
            "top": y
        });

        var elems = "<div id='explosion-container'>";
        for (var i = 0; i < 10; i++) {
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
