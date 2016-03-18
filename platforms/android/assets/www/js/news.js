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

// document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready

function onDeviceReady() {   

	$( "#loader-wrapper" ).addClass( "display_none" );
	var bible_school_detail = window.localStorage.getItem("bible_school_detail");
	var college_detail = window.localStorage.getItem("college_detail");


	$( "#bible_school_detail").html(bible_school_detail);
    $( "#college_detail").html(college_detail);
}


var EmployeeNewsService = function() {

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

    this.get_junior = function() {
		var request = url + "news/get_blog_items/29" ;
        return $.ajax({url: request});
    }
    this.get_influencers = function() {
		var request = url + "news/get_blog_items/30" ;
        return $.ajax({url: request});
    }

    this.get_professionals = function() {
		var request = url + "news/get_blog_items/31" ;
        return $.ajax({url: request});
    }

    this.get_investors = function() {
		var request = url + "news/get_blog_items/27" ;
        return $.ajax({url: request});
    }

    this.getallLatesNews = function() {
		var request = url + "news/get_news" ;
        return $.ajax({url: request});
    }
    this.getNewsDetail = function(id) {
		var request = url + "news/get_news_detail" ;
        return $.ajax({url: url + "news/get_news_detail/" + id});
    }

    this.getallinitiatives = function() {
		var request = url + "initiatives/get_initiatives" ;
        return $.ajax({url: request});
    }
    this.getInitiativeDetail = function(id,parent_id) {
		var request = url + "initiatives/get_news_detail" ;
        return $.ajax({url: url + "initiatives/get_initiative_detail/"+id+"/"+parent_id});
    }
    this.getallarms = function() {
		var request = url + "arms/get_arms" ;
        return $.ajax({url: request});
    }
    this.getArmsDetail = function(id) {
		var request = url + "arms/get_news_detail" ;
        return $.ajax({url: url + "arms/get_arms_detail/" + id});
    }
    this.getInitativePage = function(id) {
		var request = url + "initiatives/get_initiative_page" ;
        return $.ajax({url: url + "initiatives/get_initiative_page/" + id});
    }
    this.getCollegeDetail = function(id) {
		var request = url + "bible_school/get_college_details" ;
        return $.ajax({url: url + "bible_school/get_college_details/" + id});
    }
    this.getbibleschooldetail = function() {
		var request = url + "bible_school/get_bible_school_detail" ;
        return $.ajax({url: request});
    }


}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});

function get_news_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallLatesNews().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#icpak_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("news_history", data.result);
			window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{

		}
	});
}


function get_news_description(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getNewsDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#news_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );


		}
		
		else
		{

		}
	});
}

function get_initiative_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallinitiatives().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			// alert(data.result);
			$( "#initiatives_list" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("initiatives_list", data.result);
			// window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{

		}
	});
}


function get_initiatives_description(id,parent_id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	
	
	service.getInitiativeDetail(id,parent_id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			
			$( "#initiative_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

			window.localStorage.setItem("initiative_detail", data.result);

		}
		
		else
		{

		}
	});
}



function get_arms_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallarms().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );

			$( "#arms_list" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("arms_list", data.result);
			// window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			var arms_list = window.localStorage.getItem("arms_list");
			$( "#arms_list").html(arms_list);
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}

function get_college_details(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getCollegeDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// alert(data.result);
			$( "#college_detail" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("college_detail", data.result);
		}
		
		else
		{
			var college_detail = window.localStorage.getItem("college_detail");
			$( "#college_detail").html(college_detail);
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}


function bible_school_detail()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getbibleschooldetail().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#bible_school_detail" ).addClass( "display_block" );
			$( "#bible_school_detail" ).html(data.result);
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("bible_school_detail", data.result);
		}
		
		else
		{
			var bible_school_detail = window.localStorage.getItem("bible_school_detail");
			$( "#bible_school_detail").html(bible_school_detail);
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}


function get_arms_description(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getArmsDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );

			$( "#arms_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

		}
		
		else
		{

		}
	});
}

function get_initiative_page(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getInitativePage(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			
			$( "#initiative_page" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

		}
		
		else
		{

		}
	});
}

//pass the variable in the link as follows e.g. news.html?id=1
//on the news.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}




