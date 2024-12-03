document.addEventListener('DOMContentLoaded', function () {
    var playing = false;
    var score;
    var action;
    var timer;
    var correctAnswer;

    //if we click on the start/reset
    document.getElementById('startreset').onclick = function () {
        //if we are playing
        if (playing == true) {
            location.reload(); //reload page
        } else {
            //if we are not playing
            //change mode to playing
            playing = true;

            //set score to 0
            score = 0;
            document.getElementById('scorevalue').innerHTML = score;

            //show count down box
            show('timer');
            timer = 60;
            document.getElementById("timervalue").innerHTML = timer;

            //hide game over box
            hide('gameover');

            //change button to reset
            document.getElementById('startreset').innerHTML = "Reset Game";

            //start countdown
            startCountdown();
            generateQA();
        }
    };

    for (i = 1; i < 5; i++) {
        document.getElementById("box" + i).onclick = function () {
            if (playing == true) {
                if (parseInt(this.innerHTML) == correctAnswer) {
                    score++;

                    document.getElementById("scorevalue").innerHTML = score;
                    hide("wrong");
                    show("correct");
                    setTimeout(function () {
                        hide("correct");
                    }, 1000);
                    generateQA();
                } else {
                    hide("correct");
                    show("wrong");
                    setTimeout(function () {
                        hide("wrong");
                    }, 1000);
                }
            }
        }
    }

    function startCountdown() {
        action = setInterval(function () {
            timer -= 1;
            document.getElementById('timervalue').innerHTML = timer;
            if (timer == 0) {
                //game over
                stopCountdown();
                show('gameover');
                document.getElementById('gameover').innerHTML = "<p>game over</p><p>your score is " + score + ".</p>";
                hide('timer');
                hide('correct');
                hide('wrong');
                playing = false;
                document.getElementById('startreset').innerHTML = "Start Game";
            }
        }, 1000);
    }

    function stopCountdown() {
        clearInterval(action);
    }

    function hide(Id) {
        document.getElementById(Id).style.display = "none";
    }

    function show(Id) {
        document.getElementById(Id).style.display = "block";
    }

    //generate question and multiple answers
    function generateQA() {
        var x = 1 + Math.round(19 * Math.random());
        var y = 1 + Math.round(19 * Math.random());
        correctAnswer = x + y;
        document.getElementById("question").innerHTML = x + " + " + y;

        var correctPosition = 1 + Math.round(3 * Math.random());
        document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill box with correct answer

        //fill other boxes with wrong answers
        for (var i = 1; i < 5; i++) {
            if (i !== correctPosition) {
                var wrongAnswer;
                do {
                    wrongAnswer = 1 + Math.round(19 * Math.random()) + 1 + Math.round(19 * Math.random());
                } while (wrongAnswer == correctAnswer)
                document.getElementById("box" + i).innerHTML = wrongAnswer;
            }
        }
    }

});
