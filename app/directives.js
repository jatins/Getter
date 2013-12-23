console.log('directives');
var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('inspector', function(){
	return {
	    restrict: 'A',
	    controller: ['$scope', '$http', function($scope, $http) {
	      //$scope.getTemp = function(city) {}
	    }],
	    link: function(scope, iElement, iAttrs) {
			var prev, prevStyle;

	    	var activate = function() {
				console.log('activated in directive');
				var data = 'hello';

				window.parent.postMessage({
					message: 'activate',
					sender: 'Directive'
				}, "*");
			}

			var deactivate = function() {
				window.parent.postMessage({
					message: 'deactivate',
					sender: 'Directive'
				}, "*");

				console.log('deactivated in directive');
			}

	      	iElement.on('click', function(){
	      		if(!scope.activated) {
		      		activate(); 
	      		}
				else {
		      		deactivate(); 
				}	 

				scope.activated = !scope.activated;     		
	      	});
	      	   
	    }
	}
});

appDirectives.directive('binder', function() {
	return {
	    restrict: 'A',
	    link: function(scope, iElement, iAttrs) {

    		iElement.on('click', function(){
    			if(!iElement.hasClass('unmutable')) {
    				if(iElement.hasClass('active-field')) {
		      			iElement.removeClass('active-field');
		      		}
		      		else{
			      		$('.active-field').removeClass('active-field')
			      		iElement.addClass('active-field');
		      		}
    			}
	      		
	      	});
	      	
	    }
	}
});