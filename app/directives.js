var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('inspector', function(){
	return {
	    restrict: 'A',
	    controller: ['$scope', '$http', function($scope, $http) {
	      //$scope.getTemp = function(city) {}
	    }],
	    link: function(scope, iElement, iAttrs) {
			var prev, prevStyle;

			var removeTextAreaWhiteSpace = function () {
				var myTxtArea = document.getElementById('mainTxt');
				myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
			}

	    	var activate = function() {
				console.log('activated');

				$("body").click(function( event ) {
					$(prev).css({
				 		'border': prevStyle
				 	})

					event.preventDefault();
					event.stopPropagation();
				 	console.log( "clicked: " + event.target.nodeName );
				 	console.log($(event.target).text());

				 	scope.$apply(function(){
					 	scope.activeObj[scope.activeKey] = $(event.target).text();
				 	})
				 	removeTextAreaWhiteSpace();

				 	prev = event.target;
				 	prevStyle = $(event.target).css('border');
				 	$(event.target).css({
				 		'border': '2px solid orange'
				 	})
				});
			}

			var deactivate = function() {
				console.log('deactivated');
				$(prev).css({
			 		'border': prevStyle
			 	})
				$("body").off('click');
			}

	      	iElement.on('click', function(){
	      		if(!scope.activated) {
	      			console.log('activated');
		      		activate(); 
	      		}
				else {
					console.log('Deactivated');
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