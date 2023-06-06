function hideIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:none;");
    navigation.classList.remove("hide");
}

function showIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:block;");
    navigation.classList.add("hide");
}

//Comment
function showComment(){
    var commentArea = document.getElementById("comment-area");
    commentArea.classList.remove("hide");
}

//Reply
function showReply(){
    var replyArea = document.getElementById("reply-area");
    replyArea.classList.remove("hide");
}


function Reply(){
	let message = document.querySelector("#message");
	
	message.innerHTML = "Thank you for your response!";
}

function RecordReplies(){
	var form = document.getElementById('form');
	
	form.addEventListener('submit', function(event){
		event.preventDefault()  //to prevent form from autosubmitting
		var userInput = document.getElementById('userInput').value;
		
		console.log(userInput);
	})
	Reply();
	
}
