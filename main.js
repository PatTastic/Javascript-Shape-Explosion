$("document").ready(function(){
    explode.setup({
        explodeOn: "html",                      // HTML element the user must click to preform an explosion
        min: 20,                                // minimum distance an object will travel
        max: 300,                               // maximum distance an object will travel
        possibilities: 100,                     // number of possbile combinations
        rotation: true,                         // if the objects will rotate
        duration: 2,                            // duration until objects removed
        timingFunction: "linear",               // timing function of objects
        additionalClass: [],                    // additional classes to add to objects
        appendTo: "document.body",              // where the object container will be added to    
        containerId: "explosion-container",     // the id of the object container
        dontUseCSS: false,                      // false if you want only a HTML element to be the object (ex: unicode character)
        htmlElement: ""                         // dontUseCSS must be false, create your HTML element here
    });
});
