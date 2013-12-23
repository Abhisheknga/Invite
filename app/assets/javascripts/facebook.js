window.fbAsyncInit = function() {

	FB.Event.subscribe('auth.login', checkloginstatus);

	FB.getLoginStatus(function(response) {
		console.log(response.status);
		if (response.authResponse) {
			$('#btnSelect1').show();
			$('#fbLogout').show();
			$('#fblogin').hide();
			$('#fbmessage-block').show();
			FB.api('/me', function(response) {
				document.getElementById('info').innerHTML = "Hello " + response.name;
			});
		} else {
			$('#fbLogout').hide();
			$('#fblogin').show();
		}
	});

	function checkloginstatus(argument) {
		FB.getLoginStatus(function(response) {
			if (response.authResponse) {
				$('#btnSelect1').show();
				$('#fbLogout').show();
				$('#fblogin').hide();
				$('#fbmessage-block').show();
				FB.api('/me', function(response) {
					document.getElementById('info').innerHTML = "Hello " + response.name;
				});
			} else {
				$('#fbLogout').hide();
				$('#fblogin').show();
				$('#fbmessage-block').hide();
			}
		});
	}


	$('#fbLogout').click(function(e) {
		FB.logout(function(response) {
			//Do what ever you want here when logged out like reloading the page
			document.getElementById('info').innerHTML = "";
			$('#fbLogout').hide();
			$('#fblogin').show();
			$('#fbmessage-block').hide();
		});
	});

	$('#sendReqToOne').click(function(e) {
		e.preventDefault();
		var user_id, msg;
		user_id = document.getElementsByName("user_id")[0].value;
		msg = document.getElementById("fbmessage").value;
		return FB.ui({
			method : "apprequests",
			message : msg,
			to : user_id,
		}, requestCallback);
	});
	$('#sendReqToMany').click(function(e) {
		e.preventDefault();
		var msg;
		msg = document.getElementById("fbmessage").value;
		return FB.ui({
			method : "apprequests",
			message : msg,
		}, requestCallback);
	});
	var requestCallback;
	requestCallback = function(response) {
		checkloginstatus();
		return console.log(response);
	};
};
