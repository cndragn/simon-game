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

function newGame() {
    for (i = 0; i < 20; i++) {
        play = random();
        series.push(play);
    }
}

newGame();
console.log(series.length);
