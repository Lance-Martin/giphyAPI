$(document).ready(function(){
  var buttons = ["Dirt Biking", "Kayaking", "Base Jumping", "Skydiving", "Surfing",
"skating","BMX","Rally Cross", "Snow boarding","Wake Boarding"];

//function to create buttons. Empties the div with an id of "buttons". Loops through the buttons array. Uses jQuery to creat a button, then adds a class of sport, a data-name attribute that corresponds to its index in the buttons array. Adds text into the button that corresponds to its index in the buttons array. Appends the button to the div with an id of "buttons". Calls the clicks function so that buttons can be clicked.
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

//When the user clicks the button "Add Sport" then take the string in the text input and push it into the buttons array. Then call the renderButtons() function to create the new button.
  $('#addSport').on('click', function(){
		var sport = $('#sport-input').val().trim();
		buttons.push(sport);
		renderButtons();
		return false;
	 });

//function to pause and play gifs. If the clicked gif has a src that equals the gifs data-still attribute then remove the current src attribute and replace it with a src attribute equal to the gifs data-animate attribute. Else set the src attribute back to the data-still attribute.
function imgClick(image) {
  $(image).on('click',function(){
    console.log('image has been clicked');
    console.log($(this).attr('src'));
    console.log($(this).data('still'));
    if ($(this).attr('src') === $(this).data('still')) {
      console.log('Play');
      $(this).attr('src',$(this).data('animate'));
    }
     else {
      console.log('should be pausing');
      $(this).attr('src',$(this).data('still'));
    }
  });
}

//function to call to dynamically call the on click for buttons. When the user clicks a button, empty the div with an id of "display". Create a variable p that is equal to the clicked buttons data-name attribute. Create a variable queryURL that is the link to the giphyAPI and has the variable p passed into it's search query. Use jQuery to call ajax. Pass ajax queryURL, tell it to 'GET' a JSON object. When the object have been retrieved create a variable results that is equal to the object.data key. Loop through results. If results.rating has a rating of pg-13 or r then do nothing. Else create a variable gifDiv that is equal to a jQuery div object with a class of "item" and "col-md-4". Create variable rating and set it equal to the current index of results.rating. Create variable p and set it equal to jQuery created p tag with a text of '"rating"+ the rating variable'.l
function clicks() {
   $('button').on('click', function(){
    console.log("clicking");
    $('#display').empty();
    var p = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";
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
             gifImage = $('<img style="width: 100%; height: 200px;">');
             gifImage.attr('src', results[i].images.fixed_height_still.url);
             gifImage.attr('data-animate',results[i].images.fixed_height.url);
             gifImage.attr('data-still', results[i].images.fixed_height_still.url);
             gifDiv.append(p);
             gifDiv.append(gifImage);
             $('#display').prepend(gifDiv);
            }
            imgClick(gifImage);
         }
     });
   });
}

  renderButtons();
});
