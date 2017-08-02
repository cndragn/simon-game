$(document).ready(function() {

    //create random series of button presses
    var blocks = ["red", "green", "blue", "yellow"];
    var play = "";
    var series = [];

    function random() {
        var move = Math.floor((Math.random() * 4));
        if (move === 0) {
            return "red";
        }
        if (move === 1) {
            return "blue";
        }
        if (move === 2) {
            return "green";
        }
        if (move === 3) {
            return "yellow";
        }
    }

    function moves() {
        for (i = 0; i < 20; i++) {
            play = random();
            series.push(play);
        }
    }

    //Power up or power down
    document.getElementById("power").addEventListener("click", onOff);

    var pow = false;

    function onOff() {
        if (pow === false) {
            console.log("Im on now!");
            document.getElementById("count").innerHTML = "00";
            pow = true;
            start();
        } else if (pow) {
            console.log("Off now...");
            document.getElementById("count").innerHTML = "";
            pow = false;
        }
    }

    function flash() {

    }

    function start() {


        document.getElementById("start").onclick = function() {
            if (pow === true) {
                series = [];
                moves();
                console.log(series);
                var next = document.getElementById(series[0]);

                if (next = series[0]) {
                    //Flash color to show next game play                   
                    $("#" + series[0]).fadeTo(100, 0.1).fadeTo(200, 1.0);
                }
            }
        }
    }
});