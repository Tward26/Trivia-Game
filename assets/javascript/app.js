//waits for document to load before JS does anything
$(document).ready(function () {

    //variable declaration
    var corrCount = 0;
    var incorrCount = 0;
    var unansCount = 0;
    var questionCount = -1;
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

    questionList.push(objConstructor("Which hyena was Whoopi Goldberg the voice of in <i>The Lion King</i>?", ["shenzi", "banzai", "ed", "scar"], "shenzi", "Shenzi", "assets/images/hyenas.gif"));
    questionList.push(objConstructor("What other name does Dr. Facilier go by in <i>The Princess and the Frog</i>?", ["dr. voodoo", "mr. shadow", "shadow man", "chernabog"], "shadow man", "Shadow Man", "assets/images/drFacilier.gif"));
    questionList.push(objConstructor("In <i>Fantasia</i>, what song is associated with Chernabog?", ["rite of spring", "night on bald mountain", "nutcracker suite", "sorcerer's apprentice"], "night on bald mountain", "Night on Bald Mountain", "assets/images/chernabog.gif"));
    questionList.push(objConstructor("At the end of <i>Emperor's New Groove</i>, what animal does Yzma get turned into?", ["llama", "alligator", "flea", "cat"], "cat", "Cat", "assets/images/yzma.gif"));
    questionList.push(objConstructor("Who is the god of the underworld in <i>Hercules</i>?", ["zeus", "apollo", "hades", "pan"], "hades", "Hades", "assets/images/hades.gif"));
    questionList.push(objConstructor("In <i>Alice in Wonderland</i>, what card suit was the Red Queen?", ["hearts", "spades", "diamonds", "clubs"], "hearts", "Hearts", "assets/images/redqueen.gif"));
    questionList.push(objConstructor("What is Shere Khan afraid of in <i>The Jungle Book</i>?", ["humans", "bears", "thunder", "fire"], "fire", "Fire", "assets/images/shereKhan.gif"));
    questionList.push(objConstructor("What is the name of merlin's nemesis in <i>The Sword in the Stone</i>?", ["madame maleficent", "madame mim", "the crone", "wort"], "madame mim", "Madame Mim", "assets/images/madameMim.gif"));
    questionList.push(objConstructor("Who is the poacher in <i>Rescuers Down Under</i>?", ["marahute", "joanna", "steven j. irwin", "percival c. mcleach"], "percival c. mcleach", "Percival C. McLeach", "assets/images/mcleach.gif"));
    questionList.push(objConstructor("What is the name of Gaston's sidekick in <i>Beauty and the Beast</i>>", ["olaf", "lefou", "gaston jr.", "cogsworth"], "lefou", "LeFou", "assets/images/lefou.gif"));
    questionList.push(objConstructor("What other fictional character is Professor Ratigan based off of in <i>The Great Mouse Detective</i>?", ["watson", "harry potter", "moriarty", "elsa"], "moriarty", "Moriarty", "assets/images/ratigan.gif"));
    questionList.push(objConstructor("What is Jafar's relation to the Sultan in <i>Aladdin</i>?", ["grand vizier", "hand of the king", "son-in-law", "best friend"], "grand vizier", "Grand Vizier", "assets/images/jafar.gif"));
    questionList.push(objConstructor("What animal is Prince John in <i>Robin Hood</i>?", ["fox", "wolf", "lion", "vulture"], "lion", "Lion", "assets/images/robinHoodKing.gif"));

    //function definitions

    function objConstructor(question, choices, correctChoice, correctCap, image) {
        return {
            question: question,
            choices: choices,
            correctChoice: correctChoice,
            correctCap: correctCap,
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
        changeQuestion();
    }

    function resetGame() {
        corrCount = 0;
        incorrCount = 0;
        unansCount = 0;
        questionCount = -1;
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
            $("#gameSpace").html(`<p>Game Over</p><p>Here's how you did!</p><p>Correct Answers: ${corrCount}</p><p>Incorrect Answers: ${incorrCount}</p><p>Unanswered: ${unansCount}</p>`);
            var resetButton = $("<button>").text("start over?").addClass("btn btn-dark");
            resetButton.click(function () {
                resetGame();
            });
            $("#gameSpace").append(resetButton);

        }
        else {
            resetClock();
            question.html(questionList[questionCount].question);
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

    
    function intermission(response) {
        if (response === "correct") {
            clearInterval(intervalId);
            question.html("<p>Correct!</p>");
            clearQuestion();
        }
        else if (response === "incorrect") {
            clearInterval(intervalId);
            question.html(`<p>Nope!</p><p>The Correct Answer was: ${questionList[questionCount].correctCap}</p>`);
            clearQuestion();
        }
        else if (response === "unanswered") {
            clearInterval(intervalId);
            question.html(`<p>Out of Time!</p><p>The Correct Answer was: ${questionList[questionCount].correctCap}</p>`)
            clearQuestion();
        }
        
    }
    
    function clearQuestion() {
        $(".hiddenQuestion").css("display", "none");
        question.append(`<img class="img-fluid imgMax" src="${questionList[questionCount].image}"/>`)
        setTimeout(changeQuestion, 5000);
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
