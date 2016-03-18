var MembershipService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.registerInfluencer = function(form_data) {
		var request = url + "login/register_influencer";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.registerProfessional = function(form_data) {
		// var request = url + "news/get_news_detail" ;
  //       return $.ajax({url: url + "news/get_news_detail/" + id});
  		var request = url + "login/register_professional";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.registerInvestor = function(form_data) {
		var request = url + "login/register_investor";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.save_comment = function(form_data) {
		var request = url + "news/save_comment";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//localStorage.clear();
});


//cpd forum query member
$(document).on("submit","form#register_influencer",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#influencer_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new MembershipService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.registerInfluencer(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				$("#influencer_response").html('<div class="alert alert-success center-align">'+"You have been successfully registered this initiative"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
				window.localStorage.setItem("influencer_email", data.result);
				
				myApp.closeModal('.popup-influenceup');
				mainView.router.loadPage('influencers.html');
			}
			else
			{
				$("#influencer_response").html(data.result).fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
			}
        });
	}
	
	else
	{
		$("#influencer_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//cpd forum query member
$(document).on("submit","form#register_professional",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#professional_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new MembershipService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.registerProfessional(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				$("#professional_response").html('<div class="alert alert-success center-align">'+"You have been successfully registered this initiative"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
				window.localStorage.setItem("professional_email", data.result);
				
				myApp.closeModal('.popup-profup');
				mainView.router.loadPage('professionals.html');
			}
			else
			{
				$("#professional_response").html(data.result).fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
			}
        });
	}
	
	else
	{
		$("#professional_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//cpd forum query member
$(document).on("submit","form#register_investor",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#investor_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new MembershipService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.registerInvestor(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				$("#investor_response").html('<div class="alert alert-success center-align">'+"You have been successfully registered this initiative"+'</div>').fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
				window.localStorage.setItem("investor_email", data.result);
				
				myApp.closeModal('.popup-investorup');
				mainView.router.loadPage('investors.html');
			}
			else
			{
				$("#investor_response").html(data.result).fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
			}
			
        });
	}
	
	else
	{
		$("#investor_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

$$(document).on('pageInit', '.page[data-page="membership"]', function (e) 
{
	//check if influencer has signed up
	var junior_phone_number = window.localStorage.getItem("junior_phone_number");
	if((junior_phone_number == '') || (junior_phone_number == 'null') || (junior_phone_number == null))
	{
		$(".junior_action").html('<a href="#" data-popup=".popup-login" class="form_submit open-popup"> Join Now</a>').fadeIn( "slow");
	}
	
	else
	{
		$(".junior_action").html('<a href="juniors.html" class="form_submit"> View forum </a>').fadeIn( "slow");
	}

	var influencer_email = window.localStorage.getItem("influencer_email");
	if((influencer_email == '') || (influencer_email == 'null') || (influencer_email == null))
	{
		$(".influencer_action").html('<a href="#" data-popup=".popup-influenceup" class="form_submit open-popup"> Join Now </a>').fadeIn( "slow");
	}
	
	else
	{
		$(".influencer_action").html('<a href="influencers.html" class="form_submit"> View forum </a>').fadeIn( "slow");
	}
	
	//check if professional has signed up
	var professional_email = window.localStorage.getItem("professional_email");
	if((professional_email == '') || (professional_email == 'null') || (professional_email == null))
	{
		$(".professionals_action").html('<a href="#" data-popup=".popup-profup" class="form_submit open-popup"> Join Now </a>').fadeIn( "slow");
	}
	
	else
	{
		$(".professionals_action").html('<a href="professionals.html" class="form_submit"> View forum </a>').fadeIn( "slow");
	}
	
	//check if investor has signed up
	var investor_email = window.localStorage.getItem("investor_email");
	if((investor_email == '') || (investor_email == 'null') || (investor_email == null))
	{
		$(".investor_action").html('<a href="#" data-popup=".popup-investorup" class="form_submit open-popup"> Join Now </a>').fadeIn( "slow");
	}
	
	else
	{
		$(".investor_action").html('<a href="investors.html" class="form_submit"> View forum </a>').fadeIn( "slow");
	}
});


//cpd forum query member
$(document).on("submit","form#CommentForm",function(e)
{
	e.preventDefault();
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//get form values
	var form_data = new FormData(this);
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new MembershipService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.save_comment(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				$("ul#forum_comments").append(data.result);
				$( "#loader-wrapper" ).addClass( "display_none" );
			}
			else
			{
				$("#comments_error").html(data.result).fadeIn( "slow");
				$( "#loader-wrapper" ).addClass( "display_none" );
			}
			
        });
	}
	
	else
	{
		$("#comments_error").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});