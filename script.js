$(document).ready(function() {

    //create random series of button presses
    var blocks = ["red", "green", "blue", "yellow"];
    var play = "";
    var aiSeries = [];
    var playerSeries = [];
    var counter = 0;
    var strMode = false;

    //Sounds
    var auRed = new Audio("audio/simonSound1.mp3");
    var auGrn = new Audio("audio/simonSound2.mp3");
    var auBlu = new Audio("audio/simonSound3.mp3");
    var auYel = new Audio("audio/simonSound4.mp3");
    var auWin = new Audio("audio/tada.mp3");
    var auLost = new Audio("audio/fail.mp3");

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
            //console.log("Im on now!");
            document.getElementById("count").innerHTML = "00";
            document.getElementById("power").className += " active";
            pow = true;
            start();
        } else if (pow) {
            //console.log("Off now...");
            document.getElementById("count").innerHTML = "- -";
            document.getElementById("power").className -= " active";
            document.getElementById("strict").className -= " active";
            document.getElementById("start").className -= " active";
            pow = false;
        }
    }

    //Start / Restart Button function
    function start() {
        if (pow === true) {
            document.getElementById("start").onclick = function() {
                document.getElementById("start").className += " active";
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
    }

    document.getElementById("strict").onclick = function() {
        if (pow === true) {
            if (strMode === true) {
                document.getElementById("strict").className -= " active";
                strMode = false;
            } else if (strMode === false) {
                document.getElementById("strict").className += " active";
                strMode = true;
            }
        }
    }

    var iCount = 0;

    function sound(key) {
        if (key === "red") {
            auRed.play();
            //console.log("Play Red Sound!");
        }
        if (key === "green") {
            auGrn.play();
            //console.log("Play Green Sound!");
        }
        if (key === "blue") {
            auBlu.play();
            //console.log("Play Blue Sound!");
        }
        if (key === "yellow") {
            auYel.play();
            //console.log("Play Yellow Sound!");
        }
    }

    function makeMove() {
        if (pow === true) {
            //console.log(iCount);
            //console.log(counter);
            if (iCount <= counter) {
                setTimeout(function() {
                    //console.log(aiSeries);
                    $("#" + aiSeries[iCount]).fadeTo(300, 0.1).fadeTo(500, 1.0);
                    sound(aiSeries[iCount]);
                    iCount++;
                    makeMove();
                }, 1000)
            }
            //console.log(aiSeries);

            /*
            for (i = 0; i <= counter; i++) {
                $("#" + aiSeries[i]).fadeTo(300, 0.1).fadeTo(500, 1.0);
                //console.log(aiSeries[i]);

            }
            */
            document.getElementById("colors").addEventListener("click", player);
        }
    }

    function player(k) {
        if (pow === true) {
            iCount = 0;
            var key = k.target.id;

            //console.log(key);
            $("#" + key).fadeTo(300, 0.1).fadeTo(500, 1.0);
            sound(key);

            var match = "";
            playerSeries.push(key);

            //console.log("Ai: " + aiSeries);
            //console.log("Player: " + playerSeries);
            var pLength = playerSeries.length;
            //console.log("Player length: " + (pLength -= 1));
            //console.log("Counter: " + counter);

            for (i = 0; i <= counter; i++) {
                if (playerSeries[i] === aiSeries[i]) {
                    match = true
                    //console.log(match);
                }

                if (playerSeries[i] !== aiSeries[i]) {
                    match = false;
                    //console.log(match);
                }
            }

            if ((playerSeries.length - 1) === counter) {

                if (match === true) {
                    counter += 1;
                    if (counter < 10) {
                        document.getElementById("count").innerHTML = "0" + counter;
                    } else {
                        //console.log(counter);
                        document.getElementById("count").innerHTML = counter;
                    }

                    if (counter === 20) {
                        //console.log("You Win!!!");
                        auWin.play();
                    }
                    playerSeries = [];
                    setTimeout(function() { makeMove(); }, 2000)
                }

                if (match === false) {
                    //console.log("Nope!");
                    auLost.play();
                    playerSeries = [];

                    if (strMode === true) {
                        aiSeries = [];
                        setTimeout(function() { moves(); }, 3000)
                    }
                    setTimeout(function() { makeMove(); }, 3000)
                }

            }
        }

    }
});