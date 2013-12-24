console.log('services');
var appServices = angular.module('appServices', []);

appServices.factory('Field', ['$http', 
	function($http){
		var Field = {};

		// Field.all = [];

		Field.fetchAll = function(name) {
			// name = name.toLowerCase();

			if(Field[name]) return;

			if(!Field[name] || Field[name].length == 0) {
				$http.get('http://10.0.0.3:3000/categories?name='+ name)
				.success(function(data){
					console.log(data);
					var data = data.field;

					var arr = [];
					data.forEach(function(el, index){
						arr.push({'name': el, 'mutable': 0});
					});

					var len = arr.length;
					for(var i = 1; i < 10-len; i++)
						arr.push({'name': '', 'mutable': 1});

					console.log(arr);

					Field[name] = arr;
					return arr;
				})
				.error(function() {
					console.log();

					var arr = [];
					for(var i = 1; i <= 10; i++)
						arr.push({'name': '', 'mutable': 1});

					console.log(arr);

					Field[name] = arr;
					return arr;
				});
			}
			

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
		var Item = {};

		// Item.all = [];

		Item.fetch = function(cat) {
			var item = {};
			console.log(Field[cat][0]);

			Field[cat].forEach(function(el, index){
				if(el.name)
					item[el.name] = '';
			})

			if(Field[cat][0].name)
				item[Field[cat][0].name] = '#ItemName';

			if(!Item[cat]) 
				Item[cat] = [];

			Item[cat].push(item);
			return ;
		};
		

		Item.clearAll = function() {
			console.log('here');
			for(key in Item) {
				if(! ( angular.isArray(Item[key] ))) {
					console.log(key);
					console.log('is not an array');
					continue ;
				}
 
				delete Item[key];
			}
		};

		return Item;
	}
]);


appServices.factory('MainModel', [ '$http', 'Item',
	function($http, Item) {
		var MainModel = {};

		MainModel.send = function(){
			// send mainModel with items array
			var tempObj = {};
			if(!MainModel || !MainModel.urlType || !MainModel.category) {
				alert('something not defined');
				return ;
			}

			tempObj.name = MainModel.name[0].text;
			tempObj.urlType = MainModel.urlType.name;
			// tempObj[MainModel.category.name] = Item.all;

			for(key in Item) {
				if(! ( angular.isArray(Item[key] ))) {
					console.log(key);
					console.log('is not an array');
					continue ;
				}

				// only accept non empty arrays
				if(Item[key].length > 0)  
					tempObj[key] = Item[key];
			}

			console.log(tempObj);

			$http.post('http://10.0.0.3:3000/saveData', tempObj)
				.success(function(response){
					console.log(response);
				})
				.error(function(response){
					console.log(response);
				});

		}

		return MainModel;
	}
]);