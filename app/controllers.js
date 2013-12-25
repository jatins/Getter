console.log('controllers');
var appControllers = angular.module('appControllers', []);

appControllers.controller('mainCtrl', ['$scope', '$http', 'Field', 'Item','MainModel', 'CurrModel',
	function($scope, $http, Field, Item, MainModel, CurrModel){
		$scope.urlTypes = [
			{'name' : 'Company'},
			{'name' : 'Quant'},
			{'name' : 'News'}
		];

		$scope.activeObj = {};
		$scope.activeKey = '';
		$scope.MM = MainModel;

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
			// Item.fetch(cat);
			// MainModel.addItem(cat);
			var item = {};
			console.log(Field[cat][0]);

			Field[cat].forEach(function(el, index){
				if(el.name)
					item[el.name] = '';
			})

			if(Field[cat][0].name)
				item[Field[cat][0].name] = '#ItemName';

			if(!$scope.Main.items)
				$scope.Main.items = {};

			if(!$scope.Main.items[cat]) 
				$scope.Main.items[cat] = [];

			$scope.Main.items[cat].push(item);
		}

		// when subkey is changed
		$scope.subkeyChange = function() {
			console.log($scope.subkey);
			$scope.subkey_name = $scope.subkey[$scope.fields[$scope.Main.category.tName][0].name];

			// Item.clearAll();
			$scope.Main = $scope.subkey;
		}

		// Logger
		$scope.print = function(){
			console.log($scope.fields);
			console.log($scope.items);
			console.log(MainModel.items);
		};


		// Data binding to service
		$scope.fields = Field;
		$scope.items =  Item;
		$scope.Main = MainModel;
		// CurrModel = MainModel;
		$scope.CM = CurrModel;


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

