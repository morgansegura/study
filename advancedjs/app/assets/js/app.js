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
	$scope = {
		default: 'Home'
	}
});


// Main controller
ajs.controller('NotesController', function($scope) {
	$scope = {
		default: 'Notes'
	}
});


// Quizzes controller
ajs.controller('QuizzesController', function($scope) {
	$scope = {
		default: 'Quizzes'
	}
});