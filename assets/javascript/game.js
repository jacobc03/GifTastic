$(document).ready(function(){

var giphyArray=['Rick Sanchez','Jon Snow','Bart Simpson','Stewie Griffin',]

function buttonClick(){
	$('#display').empty();
	var g= $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + g+ "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: "GET"}).done(function(response) {
			
        var results = response.data;

            for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="item">')

                    var rating = results[i].rating;

                    var r = $('<p>').text("Rating: " + rating);

                    var characterImage = $('<img>');
                    characterImage.attr('src', results[i].images.fixed_height.url);

                    gifDiv.append(r)
                    gifDiv.append(characterImage)

                    $('#display').prepend(gifDiv);
            }
    }); 
};



function createButtons(){
	for (var i = 0; i < giphyArray.length; i++) {
 	
 		

 		var giphyButton = $('<button>');

 		giphyButton.attr('data-name', giphyArray[i]);

 		giphyButton.text(giphyArray[i]);
 		giphyButton.on('click', buttonClick);

 		$('#buttonArea').append(giphyButton);

 	} 
};
createButtons();



$('#addgiphy').on('click', function(){

		$('#buttonArea').empty();
		// This line of code will grab the input from the textbox
		var giphy = $('#giphy-input').val().trim();

		// The movie from the textbox is then added to our array
		giphyArray.push(giphy);
		
		// Our array then runs which handles the processing of our movie array
		createButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})
})