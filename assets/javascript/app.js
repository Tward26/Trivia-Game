$(document).ready(function () {

    //variable declaration
    var corrCount = 0;
    var incorrCount = 0;
    var unansCount = 0;
    var timeRemaining = 30;
    questionCount = 0;
    var questionList = [];
    var questionDisplay = $("<div>");
    questionDisplay.addClass("qHeader qChoice");
    var question = $("#question");
    var choice1 = $("#choice-1");
    var choice2 = $("#choice-2");
    var choice3 = $("#choice-3");
    var choice4 = $("#choice-4");
    var time = 30;
    var timerSelect = $("#timer");
    var intervalId;

    questionList.push(objConstructor("What is 1+1?", ["one", "two", "three", "four"], "two"));
    questionList.push(objConstructor("What is the third letter of the alphabet?", ["A", "B", "C", "D"], "C"));
    questionList.push(objConstructor("What color is the sky", ["blue", "potato", "green", "yes"], "blue"));
    questionList.push(objConstructor("What is my name?", ["Frank", "Beans", "Hugo", "Tyler"], "Tyler"));

    //function definitions
    function objConstructor(question, choices, correctChoice) {
        return {
            question: question,
            choices: choices,
            correctChoice: correctChoice
        }
    }

    function startGame() {
        console.log("it worked!");
        $("#startButton").css("display", "none");
        $(".hidden").css("display", "block");
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
    }

    function correctAnswer() {
        corrCount++;
        changeQuestion();
    }

    function wrongAnswer() {
        incorrCount++;
        changeQuestion();
    }

    function noAnswer() {
        unansCount++;
        changeQuestion();
    }

    function changeQuestion() {
        questionCount++;
        if (questionCount === (questionList.length)){
            clearInterval(intervalId);
            $("#questionSpace").empty();
            $("#questionSpace").html(`All done here's how you did!<p>Correct Answers: ${corrCount}</p><p>Incorrect Answers: ${incorrCount}</p><p>Unanswered: ${unansCount}</p>`);
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

    function decrement() {
        time--;
        timerSelect.text(time);
        if (time === 0) {
            clearInterval(intervalId);
            noAnswer();
        }
    }

    function resetClock(){
        time = 30;
        timerSelect.text(time);
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    $("#startButton").click(function () {
        startGame();
    });

    choice1.click(function () {
        if (questionList[questionCount].choices[0] === questionList[questionCount].correctChoice) {
            console.log("correct answer")
            correctAnswer();
        }
        else {
            console.log("incorrect answer")
            wrongAnswer();
        }
    });

    choice2.click(function () {
        if (questionList[questionCount].choices[1] === questionList[questionCount].correctChoice) {
            console.log("correct answer")
            correctAnswer();
        }
        else {
            console.log("incorrect answer")
            wrongAnswer();
        }
    });

    choice3.click(function () {
        if (questionList[questionCount].choices[2] === questionList[questionCount].correctChoice) {
            console.log("correct answer")
            correctAnswer();
        }
        else {
            console.log("incorrect answer")
            wrongAnswer();
        }
    });

    choice4.click(function () {
        if (questionList[questionCount].choices[3] === questionList[questionCount].correctChoice) {
            console.log("correct answer")
            correctAnswer();
        }
        else {
            console.log("incorrect answer")
            wrongAnswer();
        }
    });


});
