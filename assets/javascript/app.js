//waits for document to load before JS does anything
$(document).ready(function () {

    //variable declaration
    var corrCount = 0;
    var incorrCount = 0;
    var unansCount = 0;
    var questionCount = -1;
    var questionList = [
        {
            question: "Which hyena was Whoopi Goldberg the voice of in <i>The Lion King</i>?",
            choices: ["shenzi", "banzai", "ed", "scar"],
            correctChoice: "shenzi", 
            correctCap: "Shenzi",
            image: "assets/images/hyenas.gif"
        },
        {
            question: "What other name does Dr. Facilier go by in <i>The Princess and the Frog</i>?", 
            choices: ["dr. voodoo", "mr. shadow", "shadow man", "chernabog"], 
            correctChoice: "shadow man", 
            correctCap: "Shadow Man", 
            image: "assets/images/drFacilier.gif"
        },
        {
            question: "In <i>Fantasia</i>, what song is associated with Chernabog?",
            choices:  ["rite of spring", "night on bald mountain", "nutcracker suite", "sorcerer's apprentice"], 
            correctChoice: "night on bald mountain", 
            correctCap: "Night on Bald Mountain", 
            image: "assets/images/chernabog.gif"
        },
        {
            question: "At the end of <i>Emperor's New Groove</i>, what animal does Yzma get turned into?",
            choices:  ["llama", "alligator", "flea", "cat"], 
            correctChoice:"cat", 
            correctCap: "Cat", 
            image: "assets/images/yzma.gif"
        },
        {
            question:"Who is the god of the underworld in <i>Hercules</i>?",
            choices:  ["zeus", "apollo", "hades", "pan"], 
            correctChoice: "hades", 
            correctCap: "Hades", 
            image: "assets/images/hades.gif"
        },
        {
            question:"In <i>Alice in Wonderland</i>, what card suit was the Red Queen?",
            choices:  ["hearts", "spades", "diamonds", "clubs"], 
            correctChoice: "hearts", 
            correctCap:"Hearts", 
            image:"assets/images/redqueen.gif"
        },
        {
            question: "What is Shere Khan afraid of in <i>The Jungle Book</i>?",
            choices: ["humans", "bears", "thunder", "fire"], 
            correctChoice:"fire", 
            correctCap:"Fire", 
            image:"assets/images/shereKhan.gif"
        },
        {
            question:"What is the name of merlin's nemesis in <i>The Sword in the Stone</i>?",
            choices: ["madame maleficent", "madame mim", "the crone", "wort"], 
            correctChoice:"madame mim", 
            correctCap:"Madame Mim", 
            image:"assets/images/madameMim.gif"
        },
        {
            question:"Who is the poacher in <i>Rescuers Down Under</i>?",
            choices:  ["marahute", "joanna", "steven j. irwin", "percival c. mcleach"], 
            correctChoice: "percival c. mcleach", 
            correctCap:"Percival C. McLeach", 
            image: "assets/images/mcleach.gif"
        },
        {
            question:"What is the name of Gaston's sidekick in <i>Beauty and the Beast</i>>",
            choices:  ["olaf", "lefou", "gaston jr.", "cogsworth"], 
            correctChoice: "lefou", 
            correctCap:"LeFou", 
            image: "assets/images/lefou.gif"
        },
        {
            question:"What other fictional character is Professor Ratigan based off of in <i>The Great Mouse Detective</i>?",
            choices:  ["watson", "harry potter", "moriarty", "elsa"], 
            correctChoice:"moriarty", 
            correctCap:"Moriarty", 
            image: "assets/images/ratigan.gif"
        },
        {
            question: "What is Jafar's relation to the Sultan in <i>Aladdin</i>?",
            choices:  ["grand vizier", "hand of the king", "son-in-law", "best friend"], 
            correctChoice:"grand vizier", 
            correctCap: "Grand Vizier", 
            image: "assets/images/jafar.gif"
        },
        {
            question: "What animal is Prince John in <i>Robin Hood</i>?",
            choices: ["fox", "wolf", "lion", "vulture"], 
            correctChoice:"lion", 
            correctCap:"Lion", 
            image:"assets/images/robinHoodKing.gif"
        },
    ];
    var question = $("#question");
    var choice1 = $("#choice-0");
    var choice2 = $("#choice-1");
    var choice3 = $("#choice-2");
    var choice4 = $("#choice-3");
    var time;
    var timerSelect = $("#timer");
    var intervalId;
    var startVisible = true;
    var attach;

    //function definitions

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

    $('.gameBtn').on('click', function() {
        var clicked = $(this).attr("data-value");
        if(questionList[questionCount].choices[clicked] === questionList[questionCount].correctChoice){
            correctAnswer();
        }
        else{
            wrongAnswer();
        }
      });
      
});
