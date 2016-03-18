/* Function to check for network connectivity */

function is_connected()
{
	navigator.network.isReachable(base_url, function(status) {
		var connectivity = (status.internetConnectionStatus || status.code || status);
		if (connectivity === NetworkStatus.NOT_REACHABLE) {
			return false;
			//alert("No internet connection - we won't be able to show you any maps");
		} else {
			return true;
			//alert("We can reach Google - get ready for some awesome maps!");
		}
	});
}


var EmployeeSermonService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }

    this.getallLatesSermon = function() {
		var request = url + "sermons/get_sermons" ;
        return $.ajax({url: request});
    }

    this.getLatestSermon = function() {
		var request = url + "sermons/get_latest_sermon" ;
        return $.ajax({url: request});
    }
    this.getSermonDetail = function(id) {
		var request = url + "sermons/get_sermons_detail" ;
        return $.ajax({url: url + "sermons/get_sermons_detail/" + id});
    }


}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});

function get_sermons()
{
	get_latest_sermon();
	get_sermons_items();
}

function get_latest_sermon()
{
	var service = new EmployeeSermonService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getLatestSermon().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#sermons-of-icpak" ).addClass( "display_block" );
			$( "#latest_sermon" ).html( data.result );
			window.localStorage.setItem("latest_sermon", data.result);
		}
		
		else
		{

		}
	});
}

function get_sermons_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeSermonService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallLatesSermon().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#sermons-of-icpak" ).addClass( "display_block" );
			$( "#all_sermons" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("sermons_history", data.result);
			window.localStorage.setItem("total_sermons", data.total_received);
		}
		
		else
		{

		}
	});
}


function get_sermons_description(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeSermonService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	 // alert(id);
	
	service.getSermonDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#sermons-of-icpak" ).addClass( "display_block" );
			$( "#sermons_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

		}
		
		else
		{

		}
	});
}


//pass the variable in the link as follows e.g. sermons.html?id=1
//on the sermons.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}




