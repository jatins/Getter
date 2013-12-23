var appServices = angular.module('appServices', []);

appServices.factory('Field', ['$http', 
	function($http){
		var Field = function(data){
			angular.extend(this, data);
		};

		Field.all = [];

		Field.fetchAll = function() {
			var arr = [
				{'name': 'url', 'mutable' : 0},
				{'name': 'description', 'mutable': 0}
			];

			var len = arr.length;
			for(var i = 1; i < 10-len; i++)
				arr.push({'name': '', 'mutable': 1});

			Field.all = arr;
			return arr;
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

		return Item;
	}
])