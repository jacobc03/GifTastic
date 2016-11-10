$(document).ready(function(){

// Made an array to hold the TV Characters
var giphyArray=['Rick Sanchez','Jon Snow','Bart Simpson','Stewie Griffin',]

//made a function for when the giphy button is clicked
function buttonClick(){
	//Empty out Display Div
	$('#display').empty();
	//set var g to name/value of the button clicked
	var g= $(this).attr("data-name");
	// Set giphy api to a var, g is inserted into url to complete search for specific character
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + g+ "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: "GET"}).done(function(response) {
			
        var results = response.data;
   
            for (var i = 0; i < results.length; i++) {
                    // created a new div equal var gifDiv
                    var gifDiv = $('<div class="gip">')
                    // created var rating eqaul to rating results of for each giphy
                    var rating = results[i].rating;
                    // sets var r equal to a new paragraph tag where rating is inserted
                    var r = $('<p>').text("Rating: " + rating);
                    //created new image tag and set it equal to a var
                    var characterImage = $('<img>');
                    var newImage = $('<img>');
                    // assigned an attribute linking the giphys found in the results to the var characterImage
                    characterImage.attr('src', results[i].images.fixed_height_still.url).addClass('old');
                    newImage.attr('src', results[i].images.fixed_height.url).addClass('new').hide();
             		// on click function for still image that hides old and reveals new
					$(characterImage).on('click', function(){
						$(this).hide();
						$(this).parent().find('.new').show();

					});
					//on click function for animated image that hides new and reveals old
					$(newImage).on('click', function(){
						$(this).hide();
						$(this).parent().find('.old').show();
					});



             		//appends the r var to the  new gifDiv
                    gifDiv.append(r);
                    //append the characterImage var to the new gifDiv
                    gifDiv.append(characterImage);
                    gifDiv.append(newImage);
                    //prepends newest gifDiv in Display div
                    $('#display').prepend(gifDiv);
            }
    }); 
};


// Made a function that when called upon will create a button for all the items within the Array
function createButtons(){
	for (var i = 0; i < giphyArray.length; i++) {		
// Created a var equall to a button
 		var giphyButton = $('<button>');
 		giphyButton.attr('data-name', giphyArray[i]);
// Applies the text of the index to the button
 		giphyButton.text(giphyArray[i]);
//Applies a click function to the buttons to run the buttonClick function
 		giphyButton.on('click', buttonClick);
//Appends the buttons to the buttonArea Div
 		$('#buttonArea').append(giphyButton);

 	} 
};
//once the document is ready the createButtons function is run
createButtons();


//made an on click function attached to the addgiphy button
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