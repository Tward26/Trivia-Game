# Disney Villain Trivia Game

*Jquery Trivia based game using setTimeouts and intervals*

## Purpose:
Using the jQuery library, I wanted to test out using setTimeouts and intervals to practice asychronous calls in JS. The game served as a means to do this while also providing a fun example of my skills to date.

## How it works:
An array of objects is hardcoded to make the question list which includes the questions, answer choices, correct answer, and an associated gif for the question. Several functions were written to start the game, change the questions, reset the game at the end, construct the objects, interpret the players answer and increase the correct counter, as well as timer management. Each time a new question is displayed an interval is set with 30 seconds and decremented 1 second at a time, if this timer reaches zero the question is automatically changed. An intermission function was used to show the associated gif for the question along with telling the player if they were correct or not. This used a setTimeout of 5 seconds before changing to the next question.

## How to use:
The player is initially presented with a start game button that then causes the 1st question to appear. The player has 30 seconds to answer the question from 1 of 4 button choices. If the player hasn't selected an answer by the end of 30 seconds then the game displays the correct answer, an associated gif, and moves on to the next question. If a player selects the wrong answer the same thing occurs. If a player selects the correct answer it congratulates the player and moves on to the next question. This occurs until all 13 questions have been shown and then a game over screen is displayed with number of correct, incorrect, and unanswered questions. A start over button is presented which takes the player back to the 1st question, skipping over the start screen and does not require any refresing of the page.

## Functionality to add:
If given more time on the project I would add randomization to the questions so that the questions are presented in a different order each time the game is played. Ideally I would also link it to an external database for questions so it could dynamically generate a question list from a much larger pool of questions to aleviate some repetitiveness.

## Contributors:
This project is maintained and contributed to solely by myself, Tyler Ward. All images were found using google search and primarily scraped from giphy.
