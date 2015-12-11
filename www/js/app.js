// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'autocomplete.directive'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // Set the statusbar to use the default style, tweak this to
            // remove the status bar on iOS or change it to use white instead of dark colors.
            StatusBar.styleDefault();
        }
    });
})

.controller('MainCtrl', function ($scope, autocompleteModel) {
    
  	$scope.typesSelected = [];
  	$scope.types = [{
		  id: 1,
		  display: 'Wearing'
	  	},{
		  id: 2,
		  display: 'Food'
	  	},{
		  id: 3,
		  display: 'Sports'
	  	},{
		  id: 4,
		  display: 'Service'
	  	},{
		  id: 5,
		  display: 'Accessories'
  	}];

    $scope.setTypes = function(item) {
		$scope.typesSelected.push(item);
    }

    $scope.removeTypes = function(item) {

		autocompleteModel.getIndexById($scope.typesSelected, item.id).then(function(index){
			$scope.types.push($scope.typesSelected[index]);
            $scope.typesSelected.splice(index, 1);
        })

    }
});
