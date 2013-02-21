$(document).ready(function(){
	document.oncontextmenu = function(){return false;};

	$('#addPlayer').on('click', function(){ newField.bind(this)(submit_newPlayer);});
	
	$('#scores .player').prepend(get_newAddScore())
					    .prepend(get_newTotal());
	
	updateTotals();
	
});
function longPress_Handler(element){
	mousepress_time = 1000;
	$(element)
		.on("mousedown", function () {
            console.log("#########mousedown");  // Remove this line
            var $this = $(this);
            $(this).data("checkdown", setTimeout(function () {
                // Add your code to run
                $this.html(held_message);  // Remove this line
            }, mousepress_time));
        }).on("mouseup", function () {
            clearTimeout($(this).data("checkdown"));
            console.log("#######mouseup");  // Remove this line
            $(this).html(orig_message);  // Remove this line
        }).on("mouseout", function () {
            clearTimeout($(this).data("checkdown"));
            console.log("#######mouseout");  // Remove this line
            $(this).html(orig_message);  // Remove this line
        });
}
function get_newTotal(){
		return $('<div class="total">0</div>');
	}
function get_newAddScore(name){
	$newAddScore = $('<div class="addScore fixedCursor">...</div>');
	$newAddScore.on('click', function(){
		newField.bind(this)(submit_newScore);
	});
	return $newAddScore;
	}
function newField(submitFunction){
	// build a form to enter new data
	$newForm = $('<form id="newForm"></form>');
	$textInput = $('<input id="newPlayerName" type="text" label="" name = "pname">');
	$textInput.addClass('newPlayer_field')
			  .css('width', '60px');
	$newForm.append($textInput);
	
	//delete the form if the user clicks away from it
	$newForm.on('focusout', function(){
		$(this).remove();
		return false;
	}); 
	
	var addField = this;
	//on submit...
	$newForm.submit(function(){ submitFunction.bind(addField)(this); return false;});
	
	//insert form and give it focus
	$(this).before($newForm);
	$textInput.focus();
}
	
function submit_newPlayer(form){
	//get the new name
	name = $(form).children().first().val();
	console.log(name.length);
	if (name.length === 0){
		// need to add a check that Name has a non-zero length
		$(form).remove();
		return false;
	}
	
	//add the player's name on top
	$newPlayerName = $('<div class="player '+name+'">'+name+'</div>');
	$newPlayerName.insertBefore($(form));
	$(form).remove();	
	
	//add a score div for the player
	$newPlayerScore = $('<div class="player '+name+'"></div>');
	var newAddScore = get_newAddScore();// get a new ...
	$newPlayerScore.append($('<div class="total"></div>'))
			       .append(newAddScore);
			      
    rightClick_delete($newPlayerName, delete_Player);
	$('#scores').append($newPlayerScore);
	$newPlayerScore.css('width', $newPlayerName.css('width'));
}
function submit_newScore(form){
	// 'this' refers to the adding field

	// get value from form
	score = parseInt($(form).children().first().val(), 10);
	
	// check that it is a number, else quit early
	if (isNaN(score)){ $(form).remove(); return;}
	console.log(score);
	$newScore = $('<div class="score">'+score+'</div>');
	rightClick_delete($newScore, delete_Score);
	$newScore.insertAfter($(this));
	$(form).remove();
	updateTotals();
}

function rightClick_delete($item, deleteFunction){
	$item.on( 'contextmenu', function(e){
		// what to do if element gets right-clicked
		
		console.log(this);
		
		var player = this;
		//make visible context menu and bind delete function to the corresponding element.
		$('.delete').css({'top': e.clientY, 'left': e.clientX})
					.css('position', 'absolute')
					.css('display', 'block')
					.on('focusout', function() { $('.delete').css('display', 'none');})
					.on('click', function(){ deleteFunction.bind(player)();})
					.attr("tabindex",-1).focus();//give a dive tabindex in order to allow for focus events
		console.log(document.activeElement);
					
		console.log('right click!');
		return false;
	});
	
}

function delete_Score(){
	$(this).remove();
	$('.delete').css('display','none');
	updateTotals();
	return true;
}

function delete_Player(){
	name = $(this).attr('class').split(" ")[1];
	$('.'+name).remove();
	$('.delete').css('display', 'none');
	return true;
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
