var explode = {
    classes: [],
    options: {
        tooMuch: false
    },
    setup: function(setup){
        var errors = [];
        setup = explode.fixit(setup);

        if(setup.explodeOn == ""){
            errors.push("explodeOn not found, setting to 'html'");
            setup.explodeOn = "html";
        }

        if(setup.onEvent == ""){
            errors.push("onEvent not found, setting to 'click'");
            setup.onEvent = "click";
        }

        if(setup.min < 1){
            errors.push("min under the minimum, setting to 1");
            setup.min = 1;
        }
        else if(setup.min > 500){
            errors.push("min over the maximum, setting to 500");
            setup.min = 500;
        }

        if(setup.max < 10){
            errors.push("max under the minimum, setting to 10");
            setup.max = 10;
        }
        else if(setup.max > 10000){
            errors.push("max over the maximum, setting to 10,000");
            setup.max = 10000;
        }

        if(setup.possibilities < 1){
            errors.push("possibilities under the minimum, setting to 1");
            setup.possibilities = 1;
        }
        else if(setup.possibilities > 500){
            errors.push("possibilities over the maximum, setting to 500");
            setup.possibilities = 500;
        }

        if(setup.rotation != true && setup.rotation != false){
            errors.push("rotation not found, setting to false");
            setup.rotation = false;
        }

        if(setup.duration < 0.1){
            errors.push("duration under the minimum, setting to 0.1");
            setup.duration = 0.1;
        }
        else if(setup.duration > 300){ //5m
            errors.push("duration over the maximum, setting to 300");
            setup.duration = 300;
        }

        if(setup.timingFunction != "linear" && setup.timingFunction != "ease"
        && setup.timingFunction != "ease-in" && setup.timingFunction != "ease-out"
        && setup.timingFunction != "ease-in-out" && setup.timingFunction != "step-start"
        && setup.timingFunction != "step-end" && setup.timingFunction != "initial"
        && setup.timingFunction != "inherit" && setup.timingFunction.indexOf("steps") < 0
        && setup.timingFunction.indexOf("cubic-bezier") < 0){
            errors.push("timingFunction not found, setting to 'linear'");
            setup.timingFunction = "linear";
        }

        if(setup.appendTo == ""){
            errors.push("appendTo not found, setting to 'document.body'");
            setup.appendTo = "document.body";
        }

        if(setup.containerId == ""){
            errors.push("containerId not found, setting to 'explosion-container'");
            setup.containerId = "explosion-container";
        }

        if(setup.objectsPerExplosion < 1){
            errors.push("objectsPerExplosion under the minimum, setting to 1");
            setup.objectsPerExplosion = 1;
        }
        else if(setup.objectsPerExplosion > 500){
            errors.push("objectsPerExplosion over the maximum, setting to 500");
            setup.objectsPerExplosion = 500;
        }

        if(setup.maxObjects < setup.objectsPerExplosion){
            errors.push("maxObjects less than objectsPerExplosion, setting to objectsPerExplosion (" + setup.objectsPerExplosion + ")");
            setup.maxObjects = setup.objectsPerExplosion;
        }
        else if(setup.maxObjects > (setup.objectsPerExplosion * 20)){
            errors.push("maxObjects more than x20 objectsPerExplosion, setting to objectsPerExplosion (" + (setup.objectsPerExplosion * 20) + ")");
            setup.maxObjects = (setup.objectsPerExplosion * 20);
        }

        if(setup.hardwareTest != true && setup.hardwareTest != false){
            errors.push("hardwareTest not found, setting to true");
            setup.hardwareTest = true;
        }
        if(setup.hardwareMax < 1){
            errors.push("hardwareMax under the minimum, setting to 1");
            setup.hardwareMax = 1;
        }
        else if(setup.hardwareMax > 10){
            errors.push("hardwareMax over the maximum, setting to 10");
            setup.hardwareMax = 10;
        }

        if(setup.dimensions.w == 0 || setup.dimensions.h == 0){
            errors.push("dimensions either not found or incorrect, will not use")
            setup.dimensions = {w: 0, h: 0};
        }

        if(setup.logging != true && setup.logging != false){
            setup.logging = false;
        }

        if(setup.logging == true){
            for(var i=0; i<errors.length; i++){
                console.warn("Error: " + errors[i]);
            }
        }

        setup.hardwareMax *= 1000;
        explode.options = setup;
        $(explode.options.explodeOn).on(explode.options.onEvent, explode.run);
        explode.init();
    },
    init: function(){
        var dirs = {
            top: [],
            right: [],
            bottom: [],
            left: []
        };

        var start = new Date().getTime();
        for(var i=0; i<explode.options.possibilities; i++){
            explode.classes.push(Math.floor(Math.random() * explode.options.possibilities + 1));
            dirs.top.push(Math.floor(Math.random() * explode.options.max + explode.options.min));
            dirs.right.push(Math.floor(Math.random() * explode.options.max + explode.options.min));
            dirs.bottom.push(Math.floor(Math.random() * explode.options.max + explode.options.min));
            dirs.left.push(Math.floor(Math.random() * explode.options.max + explode.options.min));
        }
        var end = new Date().getTime();
        console.log("explode.js initiated in " + (end-start) + " milliseconds.");
        if(explode.options.hardwareTest && ((end - start) > explode.options.hardwareMax)){
            explode.options.tooMuch = true;
            console.log("Your device appears to be having a hard time.");
            console.log("explode.js will not run.");
            console.log("If you're the developer, you can set hardwareTest to false to force run.");
            return;
        }

        var styles = "<style>";
        styles += ".explosion-object{";
        styles += "position: absolute;";
        styles += "animation-duration: " + explode.options.duration + "s;";
        styles += "animation-timing-function: " + explode.options.timingFunction + ";}";
        for(var i=0; i<explode.options.possibilities; i++){
            styles += ".dir-" + (i + 1) + "{";
            styles += "animation-name: dir-" + (i + 1) + ";}";
        }
        for(var i=0; i<explode.options.possibilities; i++){
            var rand = {
                one: (Math.floor(Math.random() * 2 + 1)),
                two: Math.floor(Math.random() * 2 + 1)
            };

            styles += "@keyframes dir-" + (i + 1) + "{";
            for(var j=0; j<2; j++){
                if(j == 0){
                    if(explode.options.rotation){ styles += "0% {transform: rotate(0deg);"; }
                    if(rand.one == 1) { styles += "top: 0px;"; }
                    else{ styles += "bottom: 0px;"; }
                    if(rand.two == 1) { styles += "right: 0px;"; }
                    else{ styles += "left: 0px;"; }
                }
                else{
                    if(explode.options.rotation){ styles += "100% {transform: rotate(360deg);"; }

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
    },
    fixit: function(setup){
        function doesExist(elem){
            var exist = true;

            if(typeof elem == "undefined" || elem == null)
                exist = false;

            return exist;
        }

        if(!doesExist(setup))
            setup = {};
        if(!doesExist(setup.explodeOn))
            setup.explodeOn = "html";
        if(!doesExist(setup.onEvent))
            setup.onEvent = "click";
        if(!doesExist(setup.min))
            setup.min = 20;
        if(!doesExist(setup.max))
            setup.max = 300;
        if(!doesExist(setup.possibilities))
            setup.possibilities = 100;
        if(!doesExist(setup.rotation))
            setup.rotation = true;
        if(!doesExist(setup.duration))
            setup.duration = 2;
        if(!doesExist(setup.timingFunction))
            setup.timingFunction = "linear";
        if(!doesExist(setup.additionalClasses))
            setup.additionalClasses = [];
        if(!doesExist(setup.appendTo))
            setup.appendTo = "body";
        if(!doesExist(setup.containerId))
            setup.containerId = "explosion-container";
        if(!doesExist(setup.objectsPerExplosion))
            setup.objectsPerExplosion = 10;
        if(!doesExist(setup.maxObjects))
            setup.maxObjects = 50;
        if(!doesExist(setup.htmlElement))
            setup.htmlElement = "<img src='http://patwilken.me/favicon.ico'/>";
        if(!doesExist(setup.hardwareTest))
            setup.hardwareTest = true;
        if(!doesExist(setup.hardwareMax))
            setup.hardwareMax = 5;
        if(!doesExist(setup.dimensions)){
            setup.dimensions = {
                w: 48,
                h: 48
            };
        }
        else{
            if(!doesExist(setup.dimensions.w))
                setup.dimensions.w = 48;
            if(!doesExist(setup.dimensions.h))
                setup.dimensions.h = 48;
        }
        if(!doesExist(setup.logging))
            setup.logging = true;

        return setup;
    },
    run: function(e){
        if((!explode.options.tooMuch) && ($(".explosion-object").length <= explode.options.maxObjects)){
            var id = Math.floor(Math.random() * 89999 + 10000);
            var x, y;
            if(explode.options.dimensions.w != 0){
                x = (e.pageX - (explode.options.dimensions.w / 2)) + "px";
                y = (e.pageY - (explode.options.dimensions.h / 2)) + "px";
            }
            else{
                x = e.pageX + "px";
                y = e.pageY + "px";
            }
            var div = $("<div id='" + id + "'>").css({
                "position": "absolute",
                "left": x,
                "top": y
            });

            var elems = "<div id='" + explode.options.containerId + "'>";
            for(var i=0; i<explode.options.objectsPerExplosion; i++){
                elems += "<div class='explosion-object";
                for(var j=0; j<explode.options.additionalClasses.length; j++){
                    elems += " " + explode.options.additionalClasses[j];
                }
                elems += " dir-" + Math.floor(Math.random() * explode.options.possibilities + 1) + "'>";
                elems += explode.options.htmlElement
                elems += "</div>";
            }
            elems += "</div>";

            div.append(elems);
            $(explode.options.appendTo).append(div);

            setTimeout(function(){
                $("#" + id).remove();
            }, (explode.options.duration * 1000));
        }
    }
};
