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
        FB.ui({
			method : 'apprequests',
			message : 'My Great Request',
			to : selectedFriendIds,
		}, requestCallback);
    }
});
$("#btnSelect2").click(function (e) {
    e.preventDefault();
    selector2.showFriendSelector();
});
function requestCallback(response) {
		// Handle callback here
		console.log(response);
	}