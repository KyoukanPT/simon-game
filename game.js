var numberOfColors = 4;
var gameColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;
var wrongSound = "wrong";


$("#level-title").click(function () {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})


$(".btn").click(function () {
    var clickedButton = $(this).attr("id");
    userClickPattern.push(clickedButton);

    playSound(clickedButton);
    buttonAnimation(clickedButton);
    checkSequences(userClickPattern.length - 1);
})


function nextSequence() {
    level++;
    userClickPattern = [];

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * numberOfColors);
    var randomColor = gameColors[randomNumber];
    gamePattern.push(randomColor);

    setTimeout(function() {
        $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 100)

    playSound(randomColor);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function buttonAnimation(currentButton) {
    $("#" + currentButton).addClass("pressed");
    setTimeout(function () {
        $("#" + currentButton).removeClass("pressed");
    }, 150)
}


function checkSequences(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if (gamePattern.length === userClickPattern.length) {
            nextSequence();
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000)
        playSound(wrongSound);
        $("#level-title").html("Game Over.<br>Click HERE to Restart.")
        startOver();
    }
}


function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}