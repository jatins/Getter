console.log('controllers');
var appControllers = angular.module('appControllers', []);

appControllers.controller('mainCtrl', ['$scope', '$http', 'Field', 'Item','MainModel',
	function($scope, $http, Field, Item, MainModel){
		$scope.urlTypes = [
			{'name' : 'Company'},
			{'name' : 'Quant'},
			{'name' : 'News'}
		];

		$scope.activeObj = {};
		$scope.activeKey = '';

		$scope.categories = [
			{'name' : 'Description', 'tName' : 'desc'},
			{'name' : 'RSS', 'tName' : 'rss'},
			{'name' : 'Financial Info', 'tName' : 'fin_info'},
			{'name' : 'Investor Relations', 'tName' : 'inv_rel'},
			{'name' : 'News', 'tName': 'news'},
			{'name' : 'Brands', 'tName' : 'brands'}
		];

		// listen to message from bg.js
		chrome.extension.onRequest.addListener(function(data, sender, sendResponse) {
			var removeTextAreaWhiteSpace = function () {
				var myTxtArea = document.getElementById('mainTxt');
				myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
			}

			$scope.$apply(function(){
				$scope.activeObj[$scope.activeKey] = data;
			});

			removeTextAreaWhiteSpace();

		    console.log("In controller: " + data);
		    sendResponse({});
		});

		/*click functions*/
		// 'activate' field on click 
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

		// 'activate' item on click
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

		// 'Add Item' link
		$scope.addItem = function(cat) {
			Item.fetch(cat);
		}

		// when subkey is changed
		$scope.subkeyChange = function() {
			console.log('change');
			Item.clearAll();
		}

		// Logger
		$scope.print = function(){
			console.log(Field);
			console.log(Item);
			console.log(MainModel);
		};


		// Data binding to service
		$scope.fields = Field;
		$scope.items =  Item;
		$scope.MainModel = MainModel;


		// Inspector mode active or not
		$scope.activated = 0;

		$scope.fetchFields = function(name){
			Field.fetchAll(name);
		}

		// Item.fetch();
		
		// select2 options
		$scope.keySelect = {
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

	    $scope.catSelect = {
			placeholder: 'Search',
	    };

	}


]);

