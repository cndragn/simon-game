$(document).ready(function() {

    //create random series of button presses
    var blocks = ["red", "green", "blue", "yellow"];
    var play = "";
    var aiSeries = [];
    var playerSeries = [];
    var counter = 0;
    var strMode = false;

    //Select a random play
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
    //add random play to aiSeries
    function moves() {
        for (i = 0; i < 20; i++) {
            play = random();
            aiSeries.push(play);
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

    //Start / Restart Button function
    function start() {
        document.getElementById("start").onclick = function() {
            if (pow === true) {
                playerSeries = [];
                if (aiSeries == "") {
                    moves();
                }
                if (strMode === true) {
                    aiSeries = [];
                    moves();
                }
                makeMove();
            }
        }
    }

    document.getElementById("strict").onclick = function() {
        if (strMode === true) {
            strMode = false;;
        } else if (strMode === false) {
            strMode = true;
        }
    }


    function makeMove() {
        //console.log(aiSeries);
        for (i = 0; i <= counter; i++) {
            $("#" + aiSeries[i]).fadeTo(100, 0.1).fadeTo(200, 1.0);
            console.log(aiSeries[i]);

        }
        document.getElementById("colors").addEventListener("click", player);
    }

    function player(k) {
        var key = k.target.id;

        var match = "";
        playerSeries.push(key);

        //console.log("Ai: " + aiSeries);
        console.log("Player: " + playerSeries);
        var pLength = playerSeries.length;
        console.log("Player length: " + (pLength -= 1));
            console.log("Counter: " + counter);

        if ((playerSeries.length - 1) === counter) {
            
            for (i = 0; i <= counter; i++) {
                if (playerSeries[i] === aiSeries[i]) {
                    match = true
                    console.log(match);
                }

                if (playerSeries[i] !== aiSeries[i]) {
                    match = false;
                    console.log(match);
                }
            }

            
            if (match === true) {
                counter += 1;
                document.getElementById("count").innerHTML = counter;
                if (counter === 20) {
                    console.log("You Win!!!");
                }
                playerSeries = [];
                makeMove();
            }
            
            if (match === false) {
                console.log("Nope!");
                playerSeries = [];
                counter = 0;
                document.getElementById("count").innerHTML = counter;
                if (strMode === true) {
                    aiSeries = [];
                    moves();
                }
                makeMove();
            }
            
        }

    }
});