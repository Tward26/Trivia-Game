$(document).ready(function () {

    //variable declaration
    var corrCount = 0;
    var incorrCount = 0;
    var unansCount = 0;
    questionCount = 0;
    var questionList = [];
    var question = $("#question");
    var choice1 = $("#choice-1");
    var choice2 = $("#choice-2");
    var choice3 = $("#choice-3");
    var choice4 = $("#choice-4");
    var time;
    var timerSelect = $("#timer");
    var intervalId;
    var startVisible = true;
    var attach;

    //push objects into array using objConstructor function

    questionList.push(objConstructor("What is 1+1?", ["one", "two", "three", "four"], "two", "https://via.placeholder.com/150"));
    questionList.push(objConstructor("What is the third letter of the alphabet?", ["a", "b", "c", "d"], "c", "https://via.placeholder.com/150"));
    questionList.push(objConstructor("What color is the sky", ["blue", "potato", "green", "yes"], "blue", "https://via.placeholder.com/150"));
    questionList.push(objConstructor("What is my name?", ["frank", "beans", "hugo", "tyler"], "tyler", "https://via.placeholder.com/150"));


    //function definitions

    function objConstructor(question, choices, correctChoice, image) {
        return {
            question: question,
            choices: choices,
            correctChoice: correctChoice,
            image: image
        }
    }

    function startGame() {
        if (startVisible) {
            $("#startButton").css("display", "none");
            $("#startImage").css("display", "none");
            startVisible = false;
            $(".hiddenTimer").css("display", "block");
            $(".hiddenQuestion").css("display", "block");
        }
        resetClock();
        question.text(questionList[questionCount].question);
        choice1.text(questionList[questionCount].choices[0]);
        choice2.text(questionList[questionCount].choices[1]);
        choice3.text(questionList[questionCount].choices[2]);
        choice4.text(questionList[questionCount].choices[3]);
    }

    function resetGame() {
        corrCount = 0;
        incorrCount = 0;
        unansCount = 0;
        questionCount = 0;
        $("#gameSpace").empty();
        $("#gameSpace").append(attach);
        startGame();
    }

    function correctAnswer() {
        corrCount++;
        intermission("correct");
    }

    function wrongAnswer() {
        incorrCount++;
        intermission("incorrect")
    }

    function noAnswer() {
        unansCount++;
        intermission("unanswered")
    }

    function changeQuestion() {
        $(".hiddenQuestion").css("display", "block");
        ++questionCount;
        if (questionCount === (questionList.length)) {
            clearInterval(intervalId);
            attach = $("#questionSpace").detach();
            $("#gameSpace").html(`<p>All done here's how you did!</p><p>Correct Answers: ${corrCount}</p><p>Incorrect Answers: ${incorrCount}</p><p>Unanswered: ${unansCount}</p>`);
            var resetButton = $("<button>").text("start over?").addClass("btn btn-dark");
            resetButton.click(function () {
                resetGame();
            });
            $("#gameSpace").append(resetButton);

        }
        else {
            resetClock();
            question.text(questionList[questionCount].question);
            choice1.text(questionList[questionCount].choices[0]);
            choice2.text(questionList[questionCount].choices[1]);
            choice3.text(questionList[questionCount].choices[2]);
            choice4.text(questionList[questionCount].choices[3]);
        }
    }

    function resetClock() {
        time = 30;
        timerSelect.text(time);
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);

        function decrement() {
            time--;
            timerSelect.text(time);
            if (time === 0) {
                clearInterval(intervalId);
                noAnswer();
            }
        }
    }

    function clearQuestion() {
        $(".hiddenQuestion").css("display", "none");
        // question.text("");
        // choice1.text("");
        // choice2.text("");
        // choice3.text("");
        // choice4.text("");
    }

    function intermission(response) {
        if (response === "correct") {
            clearInterval(intervalId);
            clearQuestion();
            question.html("<p>Correct!</p>");
            question.append(`<img class="img-fluid" src="${questionList[questionCount].image}"/>`)
            setTimeout(changeQuestion, 5000);
        }
        else if (response === "incorrect") {
            clearInterval(intervalId);
            clearQuestion();
            question.html(`<p>Nope!</p><p>The Correct Answer was: ${questionList[questionCount].correctChoice}</p>`);
            question.append(`<img class="img-fluid" src="${questionList[questionCount].image}"/>`)
            setTimeout(changeQuestion, 5000);
        }
        else if (response === "unanswered") {
            clearInterval(intervalId);
            clearQuestion();
            question.html(`<p>Out of Time!</p><p>The Correct Answer was: ${questionList[questionCount].correctChoice}</p>`)
            question.append(`<img class="img-fluid" src="${questionList[questionCount].image}"/>`)
            setTimeout(changeQuestion, 5000);
        }

    }


    // on click functionality

    $("#startButton").click(function () {
        startGame();
    });

    choice1.click(function () {
        if (questionList[questionCount].choices[0] === questionList[questionCount].correctChoice) {
            correctAnswer();
        }
        else {
            wrongAnswer();
        }
    });

    choice2.click(function () {
        if (questionList[questionCount].choices[1] === questionList[questionCount].correctChoice) {
            correctAnswer();
        }
        else {
            wrongAnswer();
        }
    });

    choice3.click(function () {
        if (questionList[questionCount].choices[2] === questionList[questionCount].correctChoice) {
            correctAnswer();
        }
        else {
            wrongAnswer();
        }
    });

    choice4.click(function () {
        if (questionList[questionCount].choices[3] === questionList[questionCount].correctChoice) {
            correctAnswer();
        }
        else {
            wrongAnswer();
        }
    });


});
