var features = [
  {
    name: 'Plats',
    title: 'Des préférences tu auras',
    content: '<p>Regarde les plats disponibles en fonction de tes préférences. En effet, tu pourras trier les plats en fonction du prix, de leurs types, des notes, des produits utilisés et de ton régime alimentaire.</p>',
    screen: 'img/plats.png',
    icon: 'img/salad.svg',
    iconNB: 'img/saladNB.svg'
  },
  {
    name: 'Proximité',
    title: 'A proximité tu commanderas',
    content: '<p>La bonne odeur qui sort de la cuisine de tes voisins te fait toujours saliver ? Visualise les plats à quelques pas de chez toi en direct sur une carte.</p>',
    screen: 'img/plan.png',
    icon: 'img/placeholder.svg',
    iconNB: 'img/placeholderNB.svg'
  },
  {
    name: 'Profil',
    title: 'Des avis tu donneras',
    content: '<p>Suis tes amis et partage tes avis avec eux. Et oui, tu pourras voir les plats consommés par chacun de tes amis, leurs notes et leurs recommandations.</p>',
    screen: 'img/profil.png',
    icon: 'img/chef.svg',
    iconNB: 'img/chefNB.svg'
  },
  {
    name: 'Cuisinier',
    title: 'Transparent tu seras',
    content: '<p>Ajoute tes plats sur l’application et prends-les en photo. En plus de ça, tu pourras scanner les produits que tu as utilisés pour être totalement transparent envers tes clients.</p>',
    screen: 'img/AjoutDePlats.png',
    icon: 'img/kitchen-pack.svg',
    iconNB: 'img/kitchen-packNB.svg'
  },
  {
    name: 'Livraison',
    title: 'De la livraison tu ne te soucieras pas',
    content: '<p>Plutôt gourmand ? Fais-toi livrer par ton cuisinier favori. Plutôt cuistot ? Livre tes plats pour gagner plus d’argent. Si ni l’un ni l’autre ne peut se déplacer, ne vous inquiétez pas, Delize le fera pour vous.</p>',
    screen: 'img/livraison.png',
    icon: 'img/route.svg',
    iconNB: 'img/routeNB.svg'
  },
]

var featureSelected = 0;

// Render the features depending on if they are selected or not
function featuresRender(){
  $('.featureTitle').text(features[featureSelected].title);
  $('.featureDescription').html(features[featureSelected].content);

  $('.featuresList nav').children().each(function(i){
    if(i == featureSelected){
      $(this).removeClass('unactive').addClass('active')
      //$(this).html('<img src="' + features[i].icon + '"/><h3>' + features[i].name + '</h3>')
    }
    else{
      $(this).removeClass('active').addClass('unactive')
      //$(this).html('<img src="' + features[i].iconNB + '"/><h3>' + features[i].name + '</h3>')
    }
  });
  $('.featureScreen').children().each(function(i){
    if(i == featureSelected){
      $(this).show();
    }
    else{
      $(this).hide();
    }
  });
  //$('.featureScreen').html('<img src=' + features[featureSelected].screen + ' />');
}

function isValidEmailAddress(emailAddress) {
  var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
  return pattern.test(emailAddress);
};

$(document).ready(function(){

  featuresRender();

  $(window).scroll(function() {
    var height = $(window).scrollTop();

    if(height  > 100) {
      $('.header').removeClass('is-transparent').addClass('is-scrolled')
    }
    else{
      $('.header').removeClass('is-scrolled').addClass('is-transparent')
    }
  });

  $('.featureLink').click(function(e){
    e.preventDefault();
    featureSelected = $(this).attr('id').substr(-1, 1)
    featuresRender()
  })

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
            $('.footer .newsletterBloc p').hide();
            $('.footer .newsletterBloc h2').text('Bienvenue dans la communauté des Delizers!');
            $('.newsletterWrapper').append('<p class="newsletterSuccess">Bienvenue dans la communauté des Delizers!</p>')
          }
        }
      )
    }
  });
});