
jQuery(document).ready(function($) {
	console.log('hello');
	console.log($);

	var prev, prevStyle;

	chrome.extension.sendRequest('hello');
	console.log(chrome.extension);
	
	$('body').css({
		'height': '+=250px'
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
		 	});

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

	window.addEventListener( "message",
      function (e) {
            if(e.data.sender !== 'Directive'){ return; } 

            if(e.data.message == 'activate')
            	activate();
            if(e.data.message == 'deactivate')
            	deactivate();
      },
      false);



	var frame = '<iframe id="myIframe" src="chrome-extension://hcedclmblbnjdgdbehmidddnfkpkidhg/test.html"></iframe>'; 
	// kfdgmadbomafcdhgpacimciloigikokj
	
	$('body').append(frame);


});

