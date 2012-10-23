$(document).ready(function(){
	$('#addPlayer').on('click', function(){ newField(this,submit_newPlayer);});
	
	$('#scores .player').prepend(get_newAddScore())
					    .prepend(get_newTotal());
	
	console.log(getScores());
	updateTotals();
	
});
function get_newTotal(){
		return $('<div class="total">0</div>');
	}
function get_newAddScore(){
	$newAddScore = $('<div class="addScore fixedCursor">...</div>');
	$newAddScore.on('click', function(){
		newField(this, submit_newScore);
	});
	return $newAddScore;
	}
function newField(caller,submitFunction){
	// build a form to enter new data
	$newForm = $('<form id="newForm"></form>');
	$textInput = $('<input id="newPlayerName" type="text" label="" name = "pname">');
	$submit = $('<input type="submit" value="submit">');
	$textInput.addClass('newPlayer_field')
			  .css('width', '60px');
	$newForm.append($textInput);
	$newForm.append($submit);
	
	//delete the form if the user clicks away from it
	$newForm.on('focusout', function(){
		$(this).remove();
		return false;
	}); 
	
	//on submit...
	$newForm.submit(function(){ submitFunction(this); return false;});
	
	//insert form and give it focus
	$(caller).after($newForm);
	$textInput.focus();
}
	
function submit_newPlayer(form){
	//get the new name
	name = $(form).children().first().val();
	
	//add the player's name on top
	$newPlayerName = $('<div class="player '+name+'">'+name+'</div>');
	$newPlayerName.insertBefore($(form));
	$(form).remove();	
	
	//add a score div for the player
	$newPlayerScore = $('<div class="player" id="'+name+'"></div>');
	$newPlayerScore.append($('<div class="total"></div>'))
			       .append(get_newAddScore()); 
	$('#scores').append($newPlayerScore);
}
function submit_newScore(form){
	
	score = $(form).children().first().val();
	$newScore = $('<div class="score">'+score+'</div>');
	$newScore.insertBefore($(form));
	$(form).remove();
	updateTotals();
}
function getScores(){
	$scoreLists = $('#scores').children()

	var playerScores = [];
	for(player=0; player< $scoreLists.length; player++){
		
		$scores = $($scoreLists[player]).children('.score:not(.total)');

		var sum=0;
		for(score=0; score < $scores.length; score++){
			sum += parseInt($($scores[score]).html());		
		}
		playerScores.push(sum);
		
	}
	
	return playerScores;
}
function updateTotals(){
	scores = getScores();
	$scoreTotals = $('.total');
	
	for(total = 0; total<$scoreTotals.length; total++){
		$($scoreTotals[total]).html(scores[total]);
	}
	
}
