TDFriendSelector.init({debug: true});
selector1 = TDFriendSelector.newInstance({
    callbackSubmit: function(selectedFriendIds) {
        console.log("The following friends were selected: " + selectedFriendIds.join(", "));
    }
});
$("#btnSelect1").click(function (e) {
    e.preventDefault();
    selector1.showFriendSelector();
});
selector2 = TDFriendSelector.newInstance({
    callbackSubmit: function(selectedFriendIds) {
        console.log("The following friends were selected: " + selectedFriendIds.join(", "));
        console.log(selectedFriendIds);
        var msg;
		msg = document.getElementById("fbmessage").value;
        FB.ui({
			method : 'apprequests',
			message : msg,
			to : selectedFriendIds,
		}, requestCallback);
    }
});
$("#btnSelect2").click(function (e) {
    e.preventDefault();
    selector2.showFriendSelector();
});
function requestCallback(response) {
		checkloginstatus();
		console.log(response);
	}
function checkloginstatus (argument) {
	e.preventDefault();
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