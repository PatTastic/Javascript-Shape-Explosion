$("document").ready(function(){
    explode.setup({
        explodeOn: "html",                      // HTML element the user must click to preform an explosion
        min: 20,                                // minimum distance an object will travel
        max: 300,                               // maximum distance an object will travel
        possibilities: 100,                     // number of possbile combinations
        rotation: true,                         // if the objects will rotate
        duration: 2,                            // duration until objects removed
        timingFunction: "linear",               // timing function of objects
        additionalClasses: ["hex"],             // additional classes to add to objects
        appendTo: "body",                       // where the object container will be added to    
        containerId: "explosion-container",     // the id of the object container
        objectsPerExplosion: 10,                // how many object are caused by one explosion
        maxObjects: 100,                        // max amount of explosion objects that can be on the screen at once.
        htmlElement: "",                        // insert an html element into the explosion element, leave blank for nothing
        hardwareTest: true,                     // whether or not to test the users device for preformance capabilities
        hardwareMax: 2,                         // hardwareTest must be true, max seconds until explode.js is disabled
        logging: false                          // whether or not to log errors (heads up, will probably get spammy quickly)
    });
});
