angular.module('autocomplete.directive', [])

.directive('ionicAutocomplete',
    function ($ionicPopover, autocompleteModel, $filter) {
        var popoverTemplate =
         '<ion-popover-view style="margin-top:5px">' +
             '<ion-content>' +
                 '<div class="list">' +
                    '<a href="#" class="item" ng-model="typeList" ng-repeat="item in items | filter:inputSearch" ng-click="selectItem(item)">{{item.display}}</a>' +
                    '<span ng-show="!(items | filter:inputSearch).length">Nessun risultato</span>' +
                 '</div>' +
             '</ion-content>' +
         '</ion-popover-view>';
        return {
            restrict: 'A',
            scope: {
                params: '=ionicAutocomplete',
                inputSearch: '=ngModel'
            },
            link: function ($scope, $element, $attrs) {
                var popoverShown = false;
                var popover = null;

                $scope.items = $scope.params.items;

                popover = $ionicPopover.fromTemplate(popoverTemplate, {
                    scope: $scope,
				    backdropClickToClose: true,
				    hardwareBackButtonClose: true
                });

                $element.on('keydown', function (e) {
	                if($element.val().length > 2){
	                    if (!popoverShown) {
	                        popover.show(e);
	                    }
	                }else{
		                if (popoverShown) {
	                        popover.hide();
	                    }
	                }

                });

                $scope.selectItem = function (item) {
	                autocompleteModel.getIndexById($scope.items, item.id).then(function(index){
	                    $element.val("");
	                    popover.hide();
	                    $scope.params.onSelect($scope.items[index]);
	                    $scope.items.splice(index, 1);
	                })
                };
            }
        };
    }
)


.factory('autocompleteModel', function($q) {
	return{
		getIndexById: function(item, id){
			var defer = $q.defer();
			var i = 0;
	        angular.forEach(item, function(item) {
				if(item.id == id){
					defer.resolve(i);
				}
				i++;
	        });
			return defer.promise;
		}
	}
})
