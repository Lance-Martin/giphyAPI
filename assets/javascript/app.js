$(document).ready(function(){
  var buttons = ["Dirt Biking", "Kayaking", "Base Jumping", "Skydiving", "Surfing",
"skating","BMX","Rally Cross", "Snow boarding","Wake Boarding"];

  function renderButtons() {
    $('#buttons').empty();
    for (var i = 0; i < buttons.length; i++){
		    var a = $('<button>');
		    a.addClass('sport');
		    a.attr('data-name', buttons[i]);
		    a.text(buttons[i]);
		    $('#buttons').append(a);
		}
    clicks();
  }

  $('#addSport').on('click', function(){
		var sport = $('#sport-input').val().trim();
		buttons.push(sport);
		renderButtons();
		return false;
	 });

function imgClick() {
  $('img').on('click',function(){
    console.log('image has been clicked');
    console.log($(this).attr('src'));
    console.log($(this).data('still'));
    if ($(this).attr('src') == $(this).data('still')) {
      $(this).removeAttr('src');
      $(this).attr('src',$(this).data('animate'));
    }
    else {
      console.log('should be pausing');
      $(this).removeAttr('src');
      $(this).attr('src',$(this).data('still'));
    }
  });
}

function clicks() {
   $('button').on('click', function(){
    console.log("clicking");
    $(this).removeClass('active');
    $(this).addClass('active');
    var p = $(this).data('name'); // <------------------------- 1. What is this in "this" case?
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
        console.log(response);
         var results = response.data;
         for(var i=0; i < 11; i++){
            if (results[i].rating == "r" || results[i].rating == "pg-13")
            {
            }
            else {
            var gifDiv = $('<div class="item col-md-4">');
             var rating = results[i].rating;
             var p = $('<p>').text( "Rating: " + rating);
             var personImage = $('<img style="width: 100%; height: 200px;">');
             personImage.attr('src', results[i].images.fixed_height_still.url);
             personImage.attr('data-animate',results[i].images.fixed_height.url);
             personImage.attr('data-still', results[i].images.fixed_height_still.url);
             gifDiv.append(p);
             gifDiv.append(personImage);
             $('#display').prepend(gifDiv);
            }
            imgClick();
         }

     });
   });
}
  renderButtons();
});
