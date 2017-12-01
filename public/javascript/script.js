function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
};

$(document).ready(function(){


  $('.newsletterForm').submit(function(e){
    e.preventDefault();

    // Get email value
    var email = $(this).children('input[type="email"]').val();

    if(email && email != "" && isValidEmailAddress(email)){
      // Set up a new API client
      // Comes from the SDK generated with AWS API Gateway
      var client = apigClientFactory.newClient();
    
      // The SDK contains helper methods for all of the API endpoints we created.
      // Here we are using the subscribePost method which talks to the /subscribe endpoint
      // The second parameter is the body of our request, so here we will capture the email
      // provided and make the call to the API
      client.subscribePost({}, {email: email}, {})
        .then(function(data) {
          // If all went well, we'll display a success message, otherwise we'll display an error
          // Our Lambda response is wrapped in API Gateway's own response object, that is why we are 
          // accessing data.data object
          if(data.data.statusCode == 200){
            $('.newsletterForm').hide();
            $('.newsletterWrapper').append('<p class="newsletterSuccess">Bienvenue dans la communauté des Delizers !</p>')
          } else {
            alert('Erreur lors de l\'inscription à la newsletter, veuillez réessayer plus tard');
          }
        }
      )
    }
  });
});