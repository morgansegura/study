'use strict';

// a simple function to echo a string x amount of times
function echo(string, numTimes) {
    for (var i=0; i < numTimes; i++) {
        console.log(string + " " + i);
    }
}

echo("Awesome", 20);