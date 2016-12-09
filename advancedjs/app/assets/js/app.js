'use strict;'

var ajs = angular.module('ajs', ['ui.router']);

ajs.config(function($stateProvider){
		
		var home = {
			name: 'home',
			url: '/home',
			templateUrl:'views/home.html',
			controller: 'MainController'
		}	
		var notes = {
			name: 'notes',
			url: '/notes',
			templateUrl:'views/notes.html',
			controller: 'NotesController'
		}	
		var quizzes = {
			name: 'quizzes',
			url: '/quizzes',
			templateUrl:'views/quizzes.html',
			controller: 'QuizzesController'
		}			

		$stateProvider.state(home);
  		$stateProvider.state(notes);
  		$stateProvider.state(quizzes);
	});

// Main controller
ajs.controller('MainController', function($scope) {
	$scope.headline = 'This is the Home page';
});


// Main controller
ajs.controller('NotesController', function($scope) {
	// Main headline
	$scope.headline = 'This is the Notes page';
	// Notes body content
	$scope.notes = [
		{
			topic: 'What is "use strict;" and what does it do?',
			answer: '"use strict;" allows you to place a program or a function into a strict operating context.',
			pros: {
				1: 'It makes debugging easier',
				2: 'Code errors that would have otherwise been ignored or failed silently, will now generate an error or throw an exception.',
				3: 'He smiles',
				4: 'She says I love you',
			},
			cons: {
				1: 'He walks the dog',
				2: 'She laughs',
				3: 'He smiles',
				4: 'She says I love you',
			},
			sideNote: {
				1: 'Side Note 1',
				2: 'Side Note 2'
			},
			quotes: {
				1: 'Quote 1',
				2: 'Quote 2',				
			},
		},
		{
			topic: 'Why is the sky blue?',
			bullets: {
				1: 'He walks the dog',
				2: 'She laughs',
				3: 'He smiles',
				4: 'She says I love you',
			},
			sideNote: {
				1: 'Side Note 1',
				2: 'Side Note 2'
			},
			quotes: {
				1: 'Quote 1',
				2: 'Quote 2',				
			} 
		} 

	];
});


// Quizzes controller
ajs.controller('QuizzesController', function($scope) {
	$scope.headline = 'This is the Quizzes page';
});