# explode.js

Ever wanted to have an explosion occur on a click?
Ever wanted it to happen without a canvas?
Explode.js creates "explosions" of user defined html objects and css styling. It can become as simple or as complex as you want.

***jQuery is required.***
___

# Installation
Downloaded:
```javascript
<script src="explode.js"></script>
```
Link (recommended, always latest stable):
```javascript
<script src="https://rawgit.com/PatTastic/Javascript-Shape-Explosion/master/explode.js"></script>
```
___

# Setup
  - explodeOn
    - string, defaults to "html"
    - HTML element the user must click to preform an explosion
  - min
    - ing, defaults to 20
    - minimum distance an object will travel (pixels) _1 - 500_
  - max
    - int, defaults to 300
    - maximum distance an object will travel (pixels) _min - 10,000_
  - possibilities
    - int, defaults to 100
    - number of possbile direction combinations _1 - 500_
  - rotation
    - bool, defaults to true
    - if the explosion objects will rotate
  - duration
    - int, defaults to 2
    - duration until objects removed _milliseconds_
  - timingFunction
    - string, defaults to "linear"
    - timing function of explosion objects
  - additionalClasses
    - string array, defaults to []
    - additional classes to add to explosion objects, empty array if none
  - appendTo
    - string, defaults to "body"
    - where the object container will be added to
  - containerId
    - string, defaults to "explosion-container"
    - the id of the object containe
  - objectsPerExplosion
    - int, defaults to 10
    - how many object are caused by one explosion _1 - 500_
  - maxObjects
    - int, defaults to 50
    - no less than objectsPerExplosion, no more than _objectsPerExplosion * 20_
  - htmlElement
    - string, defaults to "&lt;img src='http://patwilken.me/favicon.ico'/>"
    - create an element to be placed inside the explosion object
  - hardwareTest
    - bool, defaults to true
    - Whether or not to test if the users device can handle an explosion
  - hardwareMax
    - int, defaults to 5
    - hardwareTest must be true for this setting to have an effect
    - Max amount of seconds before explosions are disabled
  - dimensions
    - object, defaults to {w: 48, h: 48}
    - If dimensions are set, explosion will occur from the center of the object, if not, top left    
  - logging
    - bool, defaults to true
    - Whether or not to log errors (heads up, will probably get spammy quickly)

___

### Minimal Setup
```javascript
$(document).ready(function() {
    explode.setup({
        htmlElement: "create an element to be placed inside the explosion object"
    });
});
```
___

### Verbose Setup
```javascript
$(document).ready(function() {
    explode.setup({
        explodeOn: "html element",
        min: 1 - 500,
        max: 10 - 10000,
        possibilities: 1 - 500,
        rotation: true|false,
        duration: 0.1 - 300,
        timingFunction: "any one of these http://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp",
        additionalClasses: ["empty", "array", "if", "no", "classes"],
        appendTo: "html element",
        containerId: "explosion-container recommended, not required",
        objectsPerExplosion: 1 - 500,
        maxObjects: no less than objectsPerExplosion, no more than objectsPerExplosion * 20,
        htmlElement: "create an element to be placed inside the explosion object",
        hardwareTest: true|false,
        hardwareMax: 1 - 10,
        dimensions: {
            w: 25,
            h: 25
        },
        logging: true|false
    });
});
```
