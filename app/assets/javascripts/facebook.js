// Query(function() {
	// $.ajax({
		// url : "" + window.location.protocol + "//connect.facebook.net/en_US/all.js",
		// dataType : 'script',
		// cache : true
	// });
	window.fbAsyncInit = function() {
		// FB.init({
			// appId : '628766457161861',
			// cookie : true,
			// frictionlessRequests : true
		// });
		FB.Event.subscribe('auth.login', checkloginstatus);
		
		FB.getLoginStatus(function(response) {
			console.log(response.status);
			if (response.authResponse) {
				$('#btnSelect1').show();
				$('#fbLogout').show();
				$('#fblogin').hide();
				$('#fbmessage-block').show();
				FB.api('/me', function(response) {
						document.getElementById('info').innerHTML="Hello "+response.name;
				});
			} else {
				$('#fbLogout').hide();
				$('#fblogin').show();
			}
		});
		// $('#fblogin').click(function(e) {
			// FB.login(function(response) {
				// if (response.authResponse) {
					// console.log('Welcome!  Fetching your information.... ');
					// FB.api('/me', function(response) {
						// console.log('Good to see you, ' + response.name + '.');
						// document.getElementById('info').innerHTML="Hello "+response.name;
						// $('#fbLogout').show();
						// $('#fblogin').hide();
					// });
				// } else {
					// console.log('User cancelled login or did not fully authorize.');
				// }
			// });
		// });
		function checkloginstatus (argument) {
		  FB.getLoginStatus(function(response) {
			if (response.authResponse) {
				$('#btnSelect1').show();
				$('#fbLogout').show();
				$('#fblogin').hide();
				$('#fbmessage-block').show();
				FB.api('/me', function(response) {
						document.getElementById('info').innerHTML="Hello "+response.name;
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
				document.getElementById('info').innerHTML="";
				//window.location.reload();
				$('#fbLogout').hide();
				$('#fblogin').show();
				$('#fbmessage-block').hide();
			});
		});

		$('#sendReqToOne').click(function(e) {
			e.preventDefault();
			var user_id,msg;
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
