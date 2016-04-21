(function () {
    'use strict';
    
    var scores = [90, 98, 89, 100, 100, 86, 94];
    // function average
    function average(scores) {    
        // add all scores togther
        var total = 0;
        scores.forEach(function (score) {
            total += score;
        });
        // divide by total number of scores
        var avg = total / scores.length;
        // round average
        return Math.round(avg);
    }
    console.log(average(scores)); // returns 94
}());
