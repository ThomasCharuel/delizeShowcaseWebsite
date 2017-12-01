$(document).ready(function(){


  $('.newsletterForm').submit(function(e){
    e.preventDefault();

    // Set up a new API client
    // Comes from the SDK generated with AWS API Gateway
    var client = apigClientFactory.newClient();

    // The SDK contains helper methods for all of the API endpoints we created.
    // Here we are using the subscribePost method which talks to the /subscribe endpoint
    // The second parameter is the body of our request, so here we will capture the email
    // provided and make the call to the API
    client.subscribePost({}, {email: $('#email').val()}, {})
      .then(function(data) {
        console.dir(data)
        // If all went well, we'll display a success message, otherwise we'll display an error
        // Our Lambda response is wrapped in API Gateway's own response object, that is why we are 
        // accessing data.data object
        if(data.data.statusCode == 200){
          alert('Add to newsletter list')
        } else {
          alert('error add newsletter list')
        }
      })
  });
});