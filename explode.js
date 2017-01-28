var explode = {classes: [], options: {tooMuch: false}};

explode.setup = function(setup){
    if(setup.explodeOn == ""){
        setup.explodeOn = "html";
    }
    
    if(setup.min < 1){
        setup.min = 1;
    }
    else if(setup.min > 500){
        setup.min = 500;
    }
    
    if(setup.max < 10){
        setup.max = 10;
    }
    else if(setup.max > 10000){
        setup.max = 10000;
    }
    
    if(setup.possibilities < 1){
        setup.possibilities = 1;
    }
    else if(setup.possibilities > 500){
        setup.possibilities = 500;
    }
    
    if(setup.rotation != true && setup.rotation != false){
        setup.rotation = false;
    }
    
    if(setup.duration < 0.1){
        setup.duration = 0.1;
    }
    else if(setup.duration > 300){ //5m
        setup.duration = 300;
    }
    
    if(setup.timingFunction != "linear" && setup.timingFunction != "ease"
    && setup.timingFunction != "ease-in" && setup.timingFunction != "ease-out"
    && setup.timingFunction != "ease-in-out" && setup.timingFunction != "step-start"
    && setup.timingFunction != "step-end" && setup.timingFunction != "initial"
    && setup.timingFunction != "inherit" && setup.timingFunction.indexOf("steps") < 0
    && setup.timingFunction.indexOf("cubic-bezier") < 0){
        setup.timingFunction = "linear";
    }
    
    if(setup.appendTo == ""){
        setup.appendTo = "document.body";
    }
    
    if(setup.containerId == ""){
        setup.containerId = "explosion-container";
    }
    
    if(setup.objectsPerExplosion < 1){
        setup.objectsPerExplosion = 1;
    }
    else if(setup.objectsPerExplosion > 500){
        setup.objectsPerExplosion = 500;
    }
    
    if(setup.maxObjects < setup.objectsPerExplosion){
        setup.maxObjects = setup.objectsPerExplosion;
    }
    else if(setup.maxObjects > (setup.objectsPerExplosion * 20)){
        setup.maxObjects = (setup.objectsPerExplosion * 20);
    }
    
    if(setup.dontUseCSS != true && setup.dontUseCSS != false){
        setup.dontUseCSS = false;
    }
    if(setup.htmlElement == "" && setup.dontUseCSS == true){
        setup.dontUseCSS = false;
    }
    
    if(setup.hardwareTest != true && setup.hardwareTest != false){
        setup.hardwareTest = true;
    }
    if(setup.hardwareMax < 1){
        setup.hardwareMax = 1;
    }
    else if(setup.hardwareMax > 10){
        setup.hardwareMax = 10;
    }
    
    explode.options = setup;
    explode.init();
};

explode.init = function(){
    var dirs = {
        top: [],
        right: [],
        bottom: [],
        left: []
    };
    
    var start = new Date().getTime();
    for(var i=0; i<100; i++){
        explode.classes.push(Math.floor(Math.random() * 100 + 1));
        dirs.top.push(Math.floor(Math.random() * 200 + 10));
        dirs.right.push(Math.floor(Math.random() * 200 + 10));
        dirs.bottom.push(Math.floor(Math.random() * 200 + 10));
        dirs.left.push(Math.floor(Math.random() * 200 + 10));
    }
    var end = new Date().getTime();
    console.log("explode.js initiated in " + (end-start) + " milliseconds.");
    if((end - start) > 2000){
        explode.options.tooMuch = true;
        console.log("Your device appears to be having a hard time.");
        console.log("explode.js will not run.");
        console.log("If you're the developer, you can set hardwareTest to false to force run.");
        return;
    }

    var styles = "<style>";
    for(var i=0; i<100; i++){
        styles += ".dir-" + (i + 1) + "{";
        styles += "animation-name: dir-" + (i + 1) + ";}";
    }
    for(var i=0; i<100; i++){
        var rand = {
            one: (Math.floor(Math.random() * 2 + 1)),
            two: Math.floor(Math.random() * 2 + 1)
        };

        styles += "@keyframes dir-" + (i + 1) + "{";
        for(var j=0; j<2; j++){
            if(j == 0){
                styles += "0% {transform: rotate(0deg);";
                if(rand.one == 1) { styles += "top: 0px;"; }
                else{ styles += "bottom: 0px;"; }
                if(rand.two == 1) { styles += "right: 0px;"; }
                else{ styles += "left: 0px;"; }
            }
            else{
                styles += "100% {transform: rotate(360deg);";
                
                if(rand.one == 1){
                    styles += "top: " + dirs.top[i] + "px;";
                }
                else{
                    styles += "bottom: " + dirs.bottom[i] + "px;";
                }
                if(rand.two == 1){
                    styles += "right: " + dirs.right[i] + "px;";
                }
                else{
                    styles += "left: " + dirs.left[i] + "px;";
                }
            }
            styles += "}";
        }
        styles += "}";
    }
    styles += "</style>";

    $(document.head).append(styles);
};

$(document).on("click", explode.options.explodeOn, function(e){
    if(!explode.options.tooMuch){
        var id = Math.floor(Math.random() * 89999 + 10000);
        var x = (e.pageX - (25 / 2)) + 'px';
        var y = (e.pageY - (25 / 2)) + 'px';
        var div = $("<div id='" + id + "'>").css({
            "position": "absolute",
            "left": x,
            "top": y
        });

        var elems = "<div id='explosion-container'>";
        for(var i=0; i<10; i++){
            elems += "<div class='hex dir-";
            elems += Math.floor(Math.random() * 100 + 1);
            elems += "'></div>";
        }
        elems += "</div>";

        div.append(elems);
        $(document.body).append(div);

        setTimeout(function(){
            $("#" + id).remove();
        }, 2000);
    }
});
