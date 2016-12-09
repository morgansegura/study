(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    // My quiz and notes
	var notesData = [{
		headline:"Headline 1",
		data: {
			240:"link",
			360:"link"
		}
	},{
		headline:"Headline 2",
		data: {
			240:"link",
			360:"link"
		}
	}];

	notesData.forEach(function(notes){
		var headline = $('<h4 class="notes headline">' + notes.headline + '<h4>'),
			data = $('<li>' + notes.data +'</li>'),
			html = '';

		$('.main').append(headline);
		html += '<ul>'
		$('.notes.headline').after(data)
		html += '</ul>'
	});
  });

})(jQuery, window, document);
