ionic-autocomplete
=================

Directive for text input autocomplete for Ionic framework

### Usage

Add the the attribute 'ionic-autocomplete' with passing an object that contains the items and a callback function for handling the select event to the input.
Add a list to show the items selected if needed.

```html
<input type="text" ng-model="search" ng-change="changing()" ionic-autocomplete="{items: types, onSelect: setTypes}" placeholder="Type">
<ul class="list">
  <li class="item" ng-repeat="type in typesSelected">
	{{ type.display }}
	<i class="icon ion-ios-close" ng-click="removeTypes(type)"></i>
  </li>
</ul>
```
the callback is called when the user select an item from the autocomplete list
```javascript
.controller('MyCtrl', function($scope, autocompleteModel){

  	$scope.typesSelected = [];
  	$scope.types = [{
		  id: 1,
		  display: 'Wear'
	  	},{
		  id: 2,
		  display: 'Test'
	  	},{
		  id: 3,
		  display: 'Sports'
	  	},{
		  id: 4,
		  display: 'Service'
	  	},{
		  id: 5,
		  display: 'Food'
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
```
