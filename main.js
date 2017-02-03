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
        maxObjects: 50,                         // max amount of explosion objects that can be on the screen at once.
        htmlElement: "",                        // insert an html element into the explosion element, leave blank for nothing
        hardwareTest: true,                     // whether or not to test the users device for preformance capabilities
        hardwareMax: 2,                         // hardwareTest must be true, max seconds until explode.js is disabled
        dimensions: {                           // dimensions of explosion object. width and height must be both either 0 or > 0
            w: 25,                              //  width of explosion object, 0 if not in use
            h: 25                               //  height of explosion object, 0 if not in use
        },                                      //  if dimensions are set, explosion will occur from the center of the object, if not, top left    
        logging: false                          // whether or not to log errors (heads up, will probably get spammy quickly)
    });
});
