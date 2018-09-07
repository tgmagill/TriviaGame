var counterHTML = $("#counter");
var questionHTML = $("#question1");
var answer1HTML = $("#answer0");
var answer2HTML = $("#answer1");
var answer3HTML = $("#answer2");
var answer4HTML = $("#answer3");
var startHTML = $("#start");
var scoreCorrectHTML = $("#score-correct");
var scoreIncorrectHTML = $("#score-incorrect");
var startAgainHTML = $("#start-again");
var startAgainContainerHTML = $(".startAgain-container");
var scoreContainerHTML = $(".score-container");
var answersClassHTML = $(".answer");
var questionClassHTML = $(".question");
var counterClassHTML = $(".counter-container");
var correctAnswerContainerHTML = $(".correct-answer-container");
var correctAnswerHTML = $("#correct-answer");

var correctGuess = 0;
var incorrectGuess = 0; 
var questionOrder = [];
var currentQuestion = 0;

var chance = new Chance();

var questions ={
	qAndA:[
		{
			question: "Which team won the 1st Super Bowl that was played in January 15, 1967?", 
			correctAnswer: "Green Bay Packers",
			wrongAnswers: [
				"New York Jets", "Oakland Raiders", "Kansas City Chiefs"
			]
		},
		{
			question: "Which hockey team lost to the Blackhawks for the Stanely Cup in 2013?",
			correctAnswer: "Boston Bruins",
			wrongAnswers: [
				"Los Angeles Kings", "Detroit Red Wings", "New Jersey Devils"
			]
		},
		{
			question: "How many panles make up a soccer ball?",
			correctAnswer: "32",
			wrongAnswers: [
				"18", "40", "32"
			]
		},
		{
			question: "What is Babe Ruth's career home run record?",
			correctAnswer: "714",
			wrongAnswers: [
				"656", "911", "803"
			]

		},
		{
			question: "The first world series was played in 1903 between which two teams?",
			correctAnswer: "Pittsburg and Boston",
			wrongAnswers: [
				"Pittsburg and Baltimore", "Chicago and St. Louis", "New York and Boston"
			]

		},
		{
			question: "Which boxing class is the heaviest?",
			correctAnswer: "Feather Weight",
			wrongAnswers: [
				"Fly Weight", "Bantam Weight", "Lead Weight"
			]

		},
		{
			question: "Who is the only athlete ever to play in a Super Bowl and a World Series?",
			correctAnswer: "Deion Sanders",
			wrongAnswers: [
				"Tom Brady", "Michael Jordon", "Tim Tebow"
			]

		},
		{
			question: "What are the official demensions of an NHL ice rink?",
			correctAnswer: " 85 ft x 200 ft",
			wrongAnswers: [
				"100 ft x 200 ft", "70 ft x 180 ft", "90 ft x 200 ft"
			]

		},
		{
			question: "How many strikes make a perfect game in bowling?",
			correctAnswer: "12",
			wrongAnswers: [
				"13", "10", "8"
			]

		},
		{
			question: "In which year was the World Series cancelled due to a players strike?",
			correctAnswer: "1994",
			wrongAnswers: [
				"2001", "1996", "1999"
			]

		}
		],

		displayQuestionAndAnswers: function(QuestionIndex){
			if(questionOrder.indexOf(QuestionIndex) >= questions.qAndA.length){
				setTimeout(function(){
					hideAnswersQuestionsCounters();
					showScore();
				}, 3000);
				
			}
			else{
				var randomQuestion = this.qAndA[QuestionIndex].question;
				var theCorrectAnswer = this.qAndA[QuestionIndex].correctAnswer;
				var WrongAnswers = this.qAndA[QuestionIndex].wrongAnswers;
				var randomDivForAnswersArr = [];
				var theWrongAnswer;

				makeRandomArray(WrongAnswers.length+1, randomDivForAnswersArr);
				randomDivForAnswersArr = chance.shuffle(randomDivForAnswersArr);



				for (i=0; i<WrongAnswers.length; i++){
					theWrongAnswer = WrongAnswers[i];

					$("#answer"+randomDivForAnswersArr[i]).html(theWrongAnswer);
					$("#answer"+randomDivForAnswersArr[i]).attr("value", "wrong");
				}
				$("#answer"+randomDivForAnswersArr[randomDivForAnswersArr.length-1]).html(theCorrectAnswer); 
				$("#answer"+randomDivForAnswersArr[randomDivForAnswersArr.length-1]).attr("value", "correct");
				questionHTML.html(randomQuestion); 
				}
		},
};

//-------------------------------------------------

var count = 15;
var startCounter;
var _theCounter;
counterHTML.html("Time remaining: " + count); 
var gameHasStarted = false;
var isScoreShowing = false;

startCounter = function(){_theCounter = setInterval(CountingDown, 1000)}; 

function CountingDown(){
	count--;
	counterHTML.html("Time remaining: " + count);
	if(count <= 0){
		count = 0;
		counterHTML.html("Time remaining: " + count); 
		if(!isScoreShowing){
			incorrectGuess++;
			displayCorrectAnswer();
			currentQuestion++;
			timeoutForAnswer(); 
			setTimeout(resetCounter, 3000);
			questions.displayQuestionAndAnswers(questionOrder[currentQuestion]);
			resetCounter();
		} 

	}
}

function startGame(){
	$(".start-button").detach();
	displayQuestionAndAnswersCounterContainers();


	if(!gameHasStarted){
		startCounter();
		gameHasStarted = true;
	}
	
	makeRandomArray(questions.qAndA.length, questionOrder);
	questionOrder = chance.shuffle(questionOrder);
	questionOrder.push(questionOrder.length+1);
	questions.displayQuestionAndAnswers(questionOrder[currentQuestion]);
}

function hideAnswersQuestionsCounters(){
	answersClassHTML.hide();
	questionClassHTML.hide();
	counterClassHTML.hide();
}

function hideScore(){
	startAgainContainerHTML.hide();
	scoreContainerHTML.hide();

}

function showScore(){
	startAgainContainerHTML.show();
	scoreContainerHTML.show();	
	scoreCorrectHTML.html("Correct answers: " + correctGuess);
	scoreIncorrectHTML.html("Incorrect answers: " + incorrectGuess);
	isScoreShowing = true;

}

function makeRandomArray(arrayLength, randomArray){ 
	for (i=0; i<arrayLength; i++){
		randomArray.push(i); 
	}
}

function resetCounter(){
	count = 25;
	counterHTML.html("Time remaining: " + count);
}

function hideCorrectAnswer(){
	correctAnswerContainerHTML.hide();
}

function displayCorrectAnswer(){
	hideAnswersQuestionsCounters();
	correctAnswerContainerHTML.show();
	correctAnswerHTML.html("The correct answer was: <b>" + questions.qAndA[questionOrder[currentQuestion]].correctAnswer +"</b>"); 
}

function displayQuestionAndAnswersCounterContainers(){
	$(".answer").show();
	$(".question").show();
	$(".counter-container").show();
}

function timeoutForAnswer(){
	setTimeout(function(){
		hideCorrectAnswer();
		displayQuestionAndAnswersCounterContainers();
	}, 3000); 
}


// Begin Game------------------------------------------------------------------------------

hideAnswersQuestionsCounters();
hideScore();
hideCorrectAnswer();
startHTML.on("click", startGame);

startAgainHTML.on("click", function(){
	correctGuess = 0;
	incorrectGuess = 0; 
	questionOrder = [];
	currentQuestion = 0;
	isScoreShowing = false;
	resetCounter();
	hideScore();
	startGame();
});

answersClassHTML.on("click", function(e){
	var answerResult = $(this).children("div").attr("value");
	if(answerResult === "correct"){
		correctGuess++;
		displayCorrectAnswer();
		currentQuestion++;
		timeoutForAnswer();
		setTimeout(resetCounter, 3000);
		questions.displayQuestionAndAnswers(questionOrder[currentQuestion]);
		resetCounter();
	
	}
	else{
		incorrectGuess++;
		displayQuestionAndAnswersCounterContainers();
		displayCorrectAnswer();
		currentQuestion++;
		timeoutForAnswer();
		setTimeout(resetCounter, 3000);
		questions.displayQuestionAndAnswers(questionOrder[currentQuestion]);
		resetCounter();
	}
})