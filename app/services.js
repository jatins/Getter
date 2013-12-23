console.log('services');
var appServices = angular.module('appServices', []);

appServices.factory('Field', ['$http', 
	function($http){
		var Field = function(data){
			angular.extend(this, data);
		};

		Field.all = [];

		Field.fetchAll = function(name) {
			name = name.toLowerCase();

			$http.get('http://10.0.0.5:3000/categories?name='+ name)
				.then(function(response){
					console.log(response.data);
					var data = response.data[0].field;

					var arr = [];
					data.forEach(function(el, index){
						arr.push({'name': el, 'mutable': 0});
					});

					var len = arr.length;
					for(var i = 1; i < 10-len; i++)
						arr.push({'name': '', 'mutable': 1});

					console.log(arr);

					Field.all = arr;
					return arr;
				});

			/*var arr = [
				{'name': 'url', 'mutable' : 0},
				{'name': 'description', 'mutable': 0}
			];*/

			
		}

		return Field;
	}
])

appServices.factory('Item', ['$http', 'Field',
	function($http, Field){
		var Item = function(data){
			angular.extend(this, data);
		};

		Item.all = [];

		Item.fetch = function() {
			var item = {};
			item.name = '#ItemName';
			Field.all.forEach(function(el, index){
				if(el.name)
					item[el.name] = '';
			})

			Item.all.push(item);
			return new Item(item);
		}

		Item.clearAll = function() {
			Item.all = [];
		}

		return Item;
	}
]);


appServices.factory('MainModel', [ '$http', 'Item',
	function($http, Item) {
		var MainModel = {};

		MainModel.send = function(){
			// send mainModel with items array
			var tempObj = {};
			tempObj.name = MainModel.name;
			tempObj.urlType = MainModel.urlType.name;
			tempObj[MainModel.category.name] = Item.all;

			// send Items
		}

		return MainModel;
	}
]);