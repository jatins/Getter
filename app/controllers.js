console.log('controllers');
var appControllers = angular.module('appControllers', []);

appControllers.controller('mainCtrl', ['$scope', '$http', 'Field', 'Item',
	function($scope, $http, Field, Item){
		$scope.urlTypes = [
			{'name' : 'Company'},
			{'name' : 'Quant'},
			{'name' : 'News'}
		];

		$scope.activeObj = {};
		$scope.activeKey = '';

		$scope.categories = [
			{'name' : 'Description'},
			{'name' : 'RSS'},
			{'name' : 'Financial Info'},
			{'name' : 'Investpr Relations'},
			{'name' : 'News'},
			{'name' : 'Brands'}
		];

		chrome.extension.onRequest.addListener(function(data, sender, sendResponse) {
			$scope.$apply(function(){
				$scope.name = data;
			});
		    console.log("In controller: " + data);
		    sendResponse({});
		});

		// click functions
		$scope.getField = function($index, field) {
			if(!field.mutable)
				return ;
			if($scope.activeObj == field) {
				$scope.activeObj = {'name' : ''};
				$scope.activeKey = 'name';
			}
			else {
				$scope.activeObj = field;
				$scope.activeKey = 'name';
			}
		};

		$scope.getItem = function(item, key) {
			console.log(item);
			console.log(key);

			if($scope.activeObj === item && $scope.activeKey === key) {
				$scope.activeObj = {'names' : ''};
				$scope.activeKey = 'name';
			}
			else {
				$scope.activeObj = item;
				$scope.activeKey = key;
			}
		};

		$scope.addItem = function() {
			Item.fetch();
		}


		// Logger
		$scope.print = function(){
			console.log($scope.fields.all);
			console.log($scope.items.all);
		};


		// Data binding to service
		$scope.fields = Field;
		$scope.items =  Item;


		// Inspector mode active or not
		$scope.activated = 0;


		Field.fetchAll();
		// Item.fetch();

		
		$scope.searchOptions = {
			minimumInputLength: 1,
			placeholder: 'Search',
			maximumSelectionSize: 1,
			'multiple': true,
			query: function(query) {
				var data = {results: []}, i, j, s;
		        for (i = 1; i < 5; i++) {
		            s = "";
		            for (j = 0; j < i; j++) {s = s + query.term;}
		            data.results.push({id: query.term + i, text: s});
		        }
		        query.callback(data);
			}
	    };


	}


]);

