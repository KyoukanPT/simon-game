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
    userClickPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * numberOfColors);
    var randomColor = gameColors[randomNumber];
    gamePattern.push(randomColor);

    playPattern();

}


function playPattern() {
    var i = 0;

    const intervalId = setInterval(function () {
        $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);

        i += 1;
        if (i === gamePattern.length) {
            clearInterval(intervalId);
        }
    }, 1000);
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
            setTimeout(function () {
                nextSequence();
            }, 1000)
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