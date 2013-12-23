
jQuery(document).ready(function($) {
	console.log('hello');
	console.log($);

	var prev, prevStyle;

	chrome.extension.sendRequest('hello');
	console.log(chrome.extension);
	
	$('body').css({
		'height': '+=440px'
	});

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

		 	prev = event.target;
		 	prevStyle = $(event.target).css('border');
		 	$(event.target).css({
		 		'border': '2px solid orange'
		 	})

		 	// document.getElementById('myIframe').contentWindow.updatedata($(event.target).text());
		 	chrome.extension.sendRequest($(event.target).text());
		});
	}

	var deactivate = function() {
		console.log('deactivated');
		$(prev).css({
	 		'border': prevStyle
	 	})
		$("body").off('click');
	}

/*	var markup = '<div id="getter" ng-app="getter">' + 
					'<strong>Getter</strong>' + 
					'<div ng-include="\'chrome-extension://hcedclmblbnjdgdbehmidddnfkpkidhg/app/partials/main.html\'"></div>' +
				 '</div>';
				  
	var holder	= '<div id="iframePlaceholder" style="display: none">' +
						'<div ng-app>' + 
				    		'<input id="iframeInput" type="text" placeholder="Type here to update page...">' +
				    		'<input type="text" ng-model="name"> {{name}}' +
				    	'</div>'+
				    	'<script src="chrome-extension://hcedclmblbnjdgdbehmidddnfkpkidhg/angular.js"></script>' +
				  '</div>';*/
	var button = '<p id="activator">Click</p>';

	var frame = '<iframe id="myIframe" src="chrome-extension://hcedclmblbnjdgdbehmidddnfkpkidhg/test.html"></iframe>'; 
	
	// kfdgmadbomafcdhgpacimciloigikokj
	
	$('body').prepend(button);
	$('body').append(frame);
	// $('body').append(holder);

	$('#activator').on('click', activate);

	// var iframe = document.getElementById('myIframe');
	// var iframePlaceholder = document.getElementById('iframePlaceholder');

	// iframe.contentDocument.body.innerHTML = iframePlaceholder.innerHTML;
});

