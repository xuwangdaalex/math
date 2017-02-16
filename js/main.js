var app = angular.module('myApp', ['angular-carousel']);
app.controller('mainCtrl', function($scope, $interval) {
    $scope.level = [{
            name: 'Easy'
        },
        {
            name: 'Middle'
        },
        {
            name: 'Hard'
        }
    ];
    $scope.questionAmount = [{
            amount: 20
        },
        {
            amount: 40
        },
        {
            amount: 60
        }
    ];

    $scope.selectedLevel = 'Easy';
    $scope.selectedAmount = '20';
    $scope.isTestStart = false;
    $scope.operators = ["+", "-", "*", "/"];
    $scope.questionsAndAnswers = [];
    $scope.showCorrectAnswers = false;
    $scope.myCorrectAnswers = 0;
    $scope.startTestButtonText = 'Start Testing';
    $scope.showStartBtn = true;
    $scope.showResultPanel = false;
    var starTime;
    // start testStart
    $scope.startTest = function() {
        $scope.resetQuestions();
        $scope.showStartBtn = false;
        $scope.isTestStart = true;
        $scope.generateQuestions();
        $scope.timing();
    }
    // generate questions
    $scope.generateQuestions = function() {
        for (i = 0; i < $scope.selectedAmount; i++) {
            var num1 = Math.floor((Math.random() * 9 + 1));
            var num2 = Math.floor((Math.random() * 9 + 1));
            if (num2 > num1) {
                var temp = num2;
                num2 = num1;
                num1 = temp;
            }
            var operator = $scope.operators[Math.floor((Math.random() * 2))];
            var result = eval(num1 + operator + num2);
            var questionString = num1 + ' ' + operator + ' ' + num2 + " = ";
            var obj = {
                question: questionString,
                correctAnswer: result,
                myAnswer: '',
                isCorrect: ''
            }
            $scope.questionsAndAnswers.push(obj);
        }
    }

    // check my answers
    $scope.checkMyAnswers = function() {
        $scope.myCorrectAnswers = 0;
        for (i = 0; i < $scope.questionsAndAnswers.length; i++) {
            if ($scope.questionsAndAnswers[i].myAnswer != '' && $scope.questionsAndAnswers[i].myAnswer == $scope.questionsAndAnswers[i].correctAnswer) {
                $scope.questionsAndAnswers[i].isCorrect = true;
                $scope.myCorrectAnswers++;
            } else {
                $scope.questionsAndAnswers[i].isCorrect = false;
            }
        }
        $scope.showCorrectAnswers = true;
        $interval.cancel(startTime);
        $scope.startTestButtonText = 'Restart';
        $scope.showStartBtn = true;
        $scope.showResultPanel = true;
        drawCircle();
        window.scrollTo(0, 0);
    }

    //reset questionsAndAnswers
    $scope.resetQuestions = function() {
        $scope.isTestStart = false;
        $scope.myCorrectAnswers = 0;
        $scope.questionsAndAnswers = [];
        $scope.showCorrectAnswers = false;
        $scope.showResultPanel = false;
    }
    //timing
    $scope.timing = function() {
        var count = 0;
        startTime = $interval(function() {
            count++;
            $scope.timeCount = toHHMMSS(count);
        }, 1000);
    }

    // format time
    var toHHMMSS = function(num) {
        var sec_num = parseInt(num, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    }

    //jquery plugin
    var drawCircle = function() {
        $('#circle').circleProgress({
            value: $scope.myCorrectAnswers / $scope.selectedAmount,
            size: 80,
            fill: {
                gradient: ['#0681c4', '#0681c4']
            }
        })
    }
});
