var stompClient = null;
function setConnected(connected) {
	document.getElementById("connect").disabled = connected;
	document.getElementById("disconnect").disabled = !connected;
	document.getElementById("conversationDiv").style.visibility = connected ? 'visible'
			: 'hidden';
	// $("#connect").disabled = connected;
	// $("#disconnect").disabled = !connected;
	$("#response").html();
}
function connect() {
	var socket = new SockJS('/endpointSang');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		setConnected(true);
		console.log('Connected:' + frame);
		stompClient.subscribe('/topic/getResponse', function(response) {
			showResponse(JSON.parse(response.body).responseMessage);
		})
	});
}
function disconnect() {
	if (stompClient != null) {
		stompClient.disconnect();
	}
	setConnected(false);
	console.log('Disconnected');
}
function sendName() {
	var name = $('#name').val();
	console.log('name:' + name);
	stompClient.send("/welcome", {}, JSON.stringify({
		'name' : name
	}));
}
function showResponse(message) {
	$("#response").html(message);
}