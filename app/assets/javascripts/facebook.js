// ( function(d, s, id) {
		// var js, fjs = d.getElementsByTagName(s)[0];
		// if (d.getElementById(id))
			// return;
		// js = d.createElement(s);
		// js.id = id;
		// js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=190820977620574";
		// fjs.parentNode.insertBefore(js, fjs);
	// }(document, 'script', 'facebook-jssdk'));

jQuery(function() {
	$.ajax({
		url : "" + window.location.protocol + "//connect.facebook.net/en_US/all.js",
		dataType : 'script',
		cache : true
	});
	window.fbAsyncInit = function() {
		FB.init({
			appId : '190820977620574',
			cookie : true,
			frictionlessRequests : true
		});
		FB.getLoginStatus(function(response) {
			console.log(response.status);
			if (response.authResponse) {
				$('#btnSelect1').show();
				$('#fbLogout').show();
				$('#fblogin').hide();
			} else {
				$('#fbLogout').hide();
				$('#fblogin').show();
			}
		});
		$('#fblogin').click(function(e) {
			FB.login(function(response) {
				if (response.authResponse) {
					console.log('Welcome!  Fetching your information.... ');
					FB.api('/me', function(response) {
						console.log('Good to see you, ' + response.name + '.');
						document.getElementById('info').innerHTML="Hello "+response.name;
						$('#fbLogout').show();
						$('#fblogin').hide();
					});
				} else {
					console.log('User cancelled login or did not fully authorize.');
				}
			});
		});
		
		$('#fbLogout').click(function(e) {
			FB.logout(function(response) {
				//Do what ever you want here when logged out like reloading the page
				document.getElementById('info').innerHTML="";
				window.location.reload();
			});
		});

		$('#sendReqToOne').click(function(e) {
			var user_id;
			user_id = document.getElementsByName("user_id")[0].value;
			return FB.ui({
				method : "apprequests",
				message : "My Great Request",
				to : user_id,
			}, requestCallback);
		});
		$('#sendReqToMany').click(function(e) {
			return FB.ui({
				method : "apprequests",
				message : "My Great Request"
			}, requestCallback);
		});
		var requestCallback;
		requestCallback = function(response) {
			$('#fbLogout').show();
			$('#fblogin').hide();
			return console.log(response);
		};
	};
}); 