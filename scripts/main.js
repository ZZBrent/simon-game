$(document).ready(function () {
    var gameStarted = false;
    var strictMode = false;
    var order = [];
    var currentClick = 0;
    var next;

    $("#strictSwitch").click(function () {
        $("#banner").empty();
        if (strictMode) {
            $(this).removeClass("btn-success");
            $(this).addClass("btn-danger");
            $(this).html("Off");
            strictMode = false;
        }
        else {
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-success");
            $(this).html("On");
            strictMode = true;
        }
    });

    $("#newGame").click(function () {
        $("#banner").empty();
        currentClick = 0;
        order = [];
        $("#score").html(currentClick);
        next = Math.floor(Math.random() * (4) + 1);
        order.push(next);
        order.forEach(lights);
    });

    $("#green").click(function () {
        tap("green", 1);
    });
    $("#red").click(function () {
        tap("red", 2);
    });
    $("#blue").click(function () {
        tap("blue", 3);
    });
    $("#yellow").click(function () {
        tap("yellow", 4);
    });

    function tap(key, code) {
        $("#banner").empty();
        if (gameStarted) {
            //What to do when the click is correct
            if (code == order[currentClick]) {
                $("#" + key).attr('id', key + 'Pressed');
                $("#" + key + "Sound")[0].play();
                setTimeout(function () {
                    $("#" + key + "Pressed").attr('id', key);
                }, 80);
                currentClick++;
                if (currentClick >= 20) {
                    $("#score").html(currentClick);
                    $("#banner").html("<h5 class = 'text-center alert alert-success'>You win!  Congratulations!</h5>");
                    gameStarted = false;
                }
                else if (currentClick == order.length) {
                    $("#score").html(currentClick);
                    currentClick = 0;
                    next = Math.floor(Math.random() * (4) + 1);
                    order.push(next);
                    gameStarted = false;
                    setTimeout(function () {
                        order.forEach(lights);
                    }, 500);
                }
            }
            //What to do when the click is incorrect
            else {
                $("#green").attr('id', 'greenPressed');
                $("#greenSound")[0].play();
                setTimeout(function () {
                    $("#greenPressed").attr('id', 'green');
                }, 80);
                $("#red").attr('id', 'redPressed');
                $("#redSound")[0].play();
                setTimeout(function () {
                    $("#redPressed").attr('id', 'red');
                }, 80);
                $("#blue").attr('id', 'bluePressed');
                $("#blueSound")[0].play();
                setTimeout(function () {
                    $("#bluePressed").attr('id', 'blue');
                }, 80);
                $("#yellow").attr('id', 'yellowPressed');
                $("#yellowSound")[0].play();
                setTimeout(function () {
                    $("#yellowPressed").attr('id', 'yellow');
                }, 80);
                if (strictMode) {
                    gameStarted = false;
                    $("#banner").html("<h5 class = 'text-center alert alert-danger'>You lost...  Feel free to try again!</h5>");
                }
                else {
                    gameStarted = false;
                    $("#banner").html("<h5 class = 'text-center alert alert-danger'>Uh oh, it looks like you messed up... but I'm not strict, so here is that pattern again...</h5>");
                    setTimeout(function () {
                        order.forEach(lights);
                    }, 250);
                    currentClick = 0;
                }
            }
        }
    }

    function lights(item, index, arr) {
        switch (item) {
            case 1:
                colorPress("green", arr, index);
                break;
            case 2:
                colorPress("red", arr, index);
                break;
            case 3:
                colorPress("blue", arr, index);
                break;
            case 4:
                colorPress("yellow", arr, index);
                break;
        }
    }
    function colorPress(color, arr, index) {
        setTimeout(function () {
            if (arr.length < 5) {
                setTimeout(function () {
                    $("#" + color).attr('id', color + 'Pressed');
                    $("#" + color + "Sound")[0].play();
                    setTimeout(function () {
                        $("#" + color + "Pressed").attr('id', color);
                        if (index + 1 == arr.length) {
                            gameStarted = true;
                        }
                    }, 500);
                }, 500 * (index + 1));
            }
            else if (arr.length < 9) {
                setTimeout(function () {
                    $("#" + color).attr('id', color + 'Pressed');
                    $("#" + color + "Sound")[0].play();
                    setTimeout(function () {
                        $("#" + color + "Pressed").attr('id', color);
                        if (index + 1 == arr.length) {
                            gameStarted = true;
                        }
                    }, 400);
                }, 400 * (index + 1));
            }
            else if (arr.length < 13) {
                setTimeout(function () {
                    $("#" + color).attr('id', color + 'Pressed');
                    $("#" + color + "Sound")[0].play();
                    setTimeout(function () {
                        $("#" + color + "Pressed").attr('id', color);
                        if (index + 1 == arr.length) {
                            gameStarted = true;
                        }
                    }, 300);
                }, 300 * (index + 1));
            }
            else {
                setTimeout(function () {
                    $("#" + color).attr('id', color + 'Pressed');
                    $("#" + color + "Sound")[0].play();
                    setTimeout(function () {
                        $("#" + color + "Pressed").attr('id', color);
                        if (index + 1 == arr.length) {
                            gameStarted = true;
                        }
                    }, 200);

                }, 300 * (index + 1));
            }
        }, ((5 / arr.length) * 180) * (index + 1));
    }
});