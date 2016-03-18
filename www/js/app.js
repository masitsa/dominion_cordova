var myApp = new Framework7();
var $$ = Dom7;


//login & registration functions
var Login_service = function() {

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

    this.register_member = function(form_data) {
		var request = url + "login/register_user";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.login_to_forum = function(form_data) {
		var request = url + "login/login_forum_member";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.getProfileDetails = function() {
		var request = url + "login/get_client_profile";
        return $.ajax({url: request});
    }

}





//Register member
$(document).on("submit","form#register_member",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#register_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.register_member(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				window.localStorage.setItem("member_email", $("input[name=email]").val());
				window.localStorage.setItem("member_password", $("input[name=password]").val());
				window.localStorage.setItem("member_phone", $("input[name=phone]").val());
				window.localStorage.setItem("member_first_name", $("input[name=first_name]").val());
				window.localStorage.setItem("member_last_name", $("input[name=last_name]").val());
				window.localStorage.setItem("member_company", $("input[name=company]").val());
				window.localStorage.setItem("member_no", $("input[name=member_no]").val());
			}
			alert(data.result);
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#register_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

function HideModalPopup() 
{
 $("#ModalBehaviour").hide(); 
}

//Login member
$(document).on("submit","form#login_member",function(e)
{
	e.preventDefault();
	
	
	$("#login_response").html('').fadeIn( "slow");
	$("#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get form values
		var member_no = $("input[name=member_no]").val();
		var password = $("input[name=password]").val();
		
		service.login_member(member_no, password).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//display login items
				service.get_member_details(member_no).done(function (employees) {
				var data_two = jQuery.parseJSON(employees);
				var first_name = data_two.member_first_name;
				$( "#user_logged_in" ).html( '<h4>Welcome back '+first_name+'</h4>' );
				});
				
				$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );
				$( ".user-nav ul li#my_account" ).css( "display", 'inline-block' );
	

				// $( "#first_page" ).css( "display_none", 'inline-block' );
				// $( "#logged_in_page" ).css( "display", 'inline-block' );
				
				$( "#login_icon" ).html( '<a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a>' );
				$( "#profile_icon" ).html( '<li><a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a></li>' );

				$('.popup-login').removeClass('modal-in');
				$('.popup-login').css('display', 'none');
				$('.popup-overlay').removeClass('modal-overlay-visible');
				
				
			}
			else
			{
				$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//Login member
$(document).on("submit","form#login_forum_member",function(e)
{
	e.preventDefault();
	//get form values
	var form_data = new FormData(this);
	$("#login_response").html('').fadeIn( "slow");
	$("#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.login_to_forum(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				if(data.level == 1)
				{
					// junior tab be open for comment
					$( "#junior" ).css( "display", 'inline-block' );
					$( "#junior-button" ).css( "display", 'none' );

					$( "#senior-message" ).html( "<p>You can only make comments on Juniors' Forum</p>");
					$( "#professionals-message" ).html( "<p>You can only make comments on Juniors' Forum </p>");

				}
				else if(data.level == 2)
				{
					// senior tab be open for comment
					$( "#senior" ).css( "display", 'inline-block' );
					$( "#senior-button" ).css( "display", 'none' );
					$( "#junior-message" ).html( "<p>You can only make comments on Seniors' Forum</p>");
					$( "#professionals-message" ).html( "<p>You can only make comments on Seniors' Forum </p>");
				}
				else if(data.level == 3)
				{
					// young professionals tab be open for comment 
					$( "#professionals" ).css( "display", 'inline-block' );
					$( "#professionals-button" ).css( "display", 'none' );
					$( "#senior-message" ).html( "<p>You can only make comments on Young Professionals Forum</p>");
					$( "#professionals-message" ).html( "<p>You can only make comments on Young Professionals Forum </p>");
				}
				//set local variables for future auto login

				window.localStorage.setItem("email_address", $("input[name=email_address]").val());
				window.localStorage.setItem("member_number", $("input[name=member_number]").val());
				$("#login_response").html('<div class="alert alert-danger center-align">'+"Welcome back, to make comments to young professionals press continue "+'</div>').fadeIn( "slow");

			}
			else
			{
				$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );

        });
	}
	
	else
	{
		$("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

function get_profile_details()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	
	service.getProfileDetails().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#my_profile" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{

		}
	});
}


//get a logged in user's details
function get_event_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {


		var data = jQuery.parseJSON(employees);
		var first_name = data.member_first_name;
		var email = data.member_email;
		var member_id = data.member_id;
		var member_no = data.member_code;

		window.localStorage.setItem("member_id", member_id);
		window.localStorage.setItem("member_first_name", first_name);
		window.localStorage.setItem("member_email", email);
		window.localStorage.setItem("member_no", member_no);

		$( "#questionForm_email" ).val( email );
		$( "#questionForm_user" ).val( first_name );
		$( "#questionForm_id" ).val( member_id );
		$( "#app_user" ).html( first_name );
	});
}

//get a logged in user's details
function get_social_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var email = data.member_email;
		var member_id = data.member_id;
		
		$( "#social_member_email1" ).val( email );
		$( "#social_member_id1" ).val( member_id );
		
		$( "#social_member_email2" ).val( email );
		$( "#social_member_id2" ).val( member_id );
		
	});
}



//cpd forum query member
$(document).on("submit","form#cpd_query_form",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#cpdquery_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_cpd_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				$("#cpdquery_response").html('<div class="alert alert-success center-align">'+"Your question has been submited."+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#cpdquery_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#cpdquery_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	// get_profile_details();
	return false;
});

function set_news_data()
{
		var service = new EmployeeNewsService();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		service.getallLatesNews().done(function (employees) {
		
		var data = jQuery.parseJSON(employees);
		
		window.localStorage.setItem("news_history", data.result);
		window.localStorage.setItem("total_news", data.total);
	});
}
function load_messages()
{
	var messages = window.localStorage.getItem("news_history");
	$("#icpak_news").html(messages);
}

function change_to_arms()
{
	get_arms_items();
	window.location.href = "arms.html";
}

$$(document).on('pageInit', '.page[data-page="influencers"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_influencers().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#influencers_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("influencers_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
})
$$(document).on('pageInit', '.page[data-page="juniors"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_junior().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#junior_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("junior_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
})

$$(document).on('pageInit', '.page[data-page="professionals"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_professionals().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#professionals_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("professionals_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
});

$$(document).on('pageInit', '.page[data-page="investors"]', function (e) 
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_investors().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#investors_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("investors_news", data.result);
			//window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
});

//Share post
$(document).on("click","a.share_post",function(e)
{
	e.preventDefault();
	
	var message = $( "#content" ).val();
	var subject = $( "#title" ).val();
	var file = $( "#image" ).val();
	var url = null;
	window.plugins.socialsharing.share(
		  message,
		  subject,
		  file,
		  url,
		  function(result) {/*alert('success: ' + result)*/},
		  function(result) {/*alert('error: ' + result)*/}
	 );
	return false;
});