const baseUrl= 'http://localhost:3000'

$( document ).ready(function() {
    console.log( "ready!" );
      isLogin()

    $('#to-login').click(function(event) {
      console.log('masukkkk')
      event.preventDefault()
      $('#login').show()
      $('#register').hide()
    })

    $('#to-register').click(function(event) {
      console.log('masukkkk')
      event.preventDefault()
      $('#register').show()
      $('#login').hide()
      
    })

    $('#register-form').submit(function(event) {
      event.preventDefault()
      let newData = {
        name : $('#name-reg').val(),
        email : $('#email-reg').val(),
        password : $('#password-reg').val()
      }
      register(newData)
    })

    $('#login-form').submit(function(event) {
      event.preventDefault()
      let userData = {
        email : $('#email-log').val(),
        password : $('#password-log').val()
      }
      console.log(userData)
      login(userData)
    })

    $('#to-logout').click(function(event) {
      event.preventDefault()
      logout()
    })

    $('#form-city').submit(function(event){
      event.preventDefault()
      fetchResto()
    })

    $('#form-nutrition').submit(function(event){
      event.preventDefault()
      console.log('masuk submit')
      let data={
        food: $('#input-food').val(),
        nutrition: $('#input-nutrition').val()
      }
        fetchNutrition(data)
    })


});

function register (newUser) {
  console.log(newUser)
  $.ajax({
    url: `${baseUrl}/users/register`,
    type: 'post',
    dataType: 'json',
    data: newUser
  })
    .done(function(success){
        console.log(success)
        let loginOption = {
          email : newUser.email,
          password: newUser.password
        }
        login(loginOption)
      })
    .fail(function(error){
        console.log(error)
    })
}

function login (loginOption) {
  $.ajax({
    url: `${baseUrl}/users/login`,
    type: 'post',
    dataType: 'json',
    data: loginOption
  })
    .done(function(Data){
      console.log(Data)
      localStorage.setItem('token', Data.token)
      localStorage.setItem('name', Data.name)
      hasToken()
    })
    .fail(function(error){
      console.log(error)
    })
}

function onSignIn(googleUser) {
  console.log('masuk google sign in')
    const idToken= googleUser.getAuthResponse().id_token
     $.ajax({
        url: `${baseUrl}/users/loginGoogle`,
        method: 'post',
        dataType: 'json',
        data:{idToken}
     })
     .done(function(Data){
       console.log(Data)
       localStorage.setItem('token', Data.token)
       localStorage.setItem('name', Data.name)
       hasToken()
     })
     .fail(function(err){
      console.log(err)
  
     })
}

function isLogin(){
  if(localStorage.token){
    hasToken()
  }else{
    noToken()
  }
}

function hasToken(){
    $('#to-login').hide()
    $('#to-register').hide()
    $('#register').hide()
    $('#login').hide()
    $('#to-logout').show()
    $('#after-login').show()
}

function noToken(){
  $('#to-login').show()
  $('#to-register').show()
  $('#register').hide()
  $('#login').show()
  $('#to-logout').hide()
  $('#after-login').hide()
}

function logout(){
  localStorage.clear()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then(function(){
    console.log('User signed out')
    noToken()
  })
  .catch(function(err){
    console.log(err)
  })
  noToken()
}

function fetchResto(){
    $('#list-resto').append(`
        <p>Please wait...</p>
    `)
    let city= $('#input-city').val()
    $.ajax({
      url: `${baseUrl}/resto/city/${city}`,
      type: 'get'
    })
    .done(data =>{
      $('#list-resto').empty()
      let restaurants= data.restaurants
      let list = ""
      for (let i = 0; i < restaurants.length; i++) {
        console.log(restaurants[i].restaurant.id)
        let data= restaurants[i].restaurant
        let image = data.thumb
        if(!data.thumb){
          image = 'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image-300x225.png'
        }
        $('#list-resto').append(`        
            <div class="col s3" >            
              <div class="card">
                <div class="card-image">
                  <img src="${image}">
                  
                </div>
                <div class="card-content" style="height: 130px">
                  <h6 style="font-size: 1em;">${data.name}</h6>
                  <p style="font-size: 0.8em">${data.location.locality}</p>
                </div>
                <div class="card-action">
                  <a href="" onclick="fetchDetails('${data.id}')">Detail</a>
                </div>
              </div>
            </div>       
          `)
      }
    })
    .fail(function(error){
      console.log('kok error get data restaurants')
      console.log(error)
      
      })
}

function fetchNutrition(input){
  console.log('masuk fetch');
  
  let {food, nutrition}= input
    $.ajax({
      url: `${baseUrl}/nutritions?food=${food}&nutrition=${nutrition}`,
      type: 'get',
    })
    .done(data =>{
      console.log(data)
      if(data.answer){
        Swal.fire({
          title: '<strong>Nutrition <u>Info</u></strong>',
          type: 'info',
          html:
          `<img src="${data.image}" alt="Image Food"><br>` +
            `${data.answer}`,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
        })
      }else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Info Not Found!',
        })
      }
      
    })
    .fail(function(error){
      console.log('kok error get data nutrition')
      console.log(error)
      
      })
}

function fetchDetails(id){
    event.preventDefault()
    console.log(`${baseUrl}/resto/${id}`)
    $.ajax({
      url: `${baseUrl}/resto/${id}`,
      type: 'get',
    })
    .done((data) => {
      console.log(data)
      
      $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=id&q=review restaurant ${data.name}&type=video&key=AIzaSyCpRPmpzV8_iTPbBDUeg9jOWnjdyxj2Gao`,
        type: 'get',
      })
      .done(youtube =>{
        let videoId= youtube.items[0].id.videoId

        console.log(location)
      Swal.fire({
        html:
          `
          <div class="row">
            <div class="col s6">
                <h5>Detail Information</h5>
                <h6>${data.name}</h6>
                <p>${data.location.address}</p>
                <p>Rating: ${data.user_rating.aggregate_rating} <span>${data.user_rating.rating_text}</span></p> 
                <p>Address: ${data.cuisines}</p>
                <p>Timing: ${data.timings}</p>
                <p>Average Cost for Two: ${data.currency} ${data.average_cost_for_two}</p>
                <a href="${data.menu_url}">Link Menu</a>
                
                <div class="row">
                <div class="col s12 m6">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                      <span class="card-title">Review: </span>
                      <p>${data.all_reviews.reviews[0].review.user.name}</p>
                      <p>${data.all_reviews.reviews[0].review.review_text}</p>
                    </div>
                  </div>
                </div>
              </div>
          
            </div> 
            <div class="col s6">
                <h5>Review Video</h5>
                <iframe width="420" height="245" src="https://www.youtube.com/embed/${videoId}" allowfullscreen="allowfullscreen"></iframe><br>
                <a href="" onclick="initMap('${data.location.latitude}', '${data.location.longitude}')">Show Maps</a>
                <div id="map"></div>
            </div>   
        </div>
          `,
        showCloseButton: true,
        showCancelButton: false,
        heightAuto: false,
        width: 1500
      })


    })
    .fail((jxHQR, error)=>{
      console.log('error get youtube')
      console.log(error)
    })

  })
  .fail(error =>{
    console.log('masuk error fetch detail')
    console.log(error)
    
  })
}

function initMap(lat, long) {
  event.preventDefault()
  console.log(lat,  '=====')
  console.log(long, '=====')
  var location = {lat: Number(lat), lng: Number(long)};
  var map = new google.maps.Map(document.getElementById('map'), {zoom: 17, center: location});
  var marker = new google.maps.Marker({position: location, map: map});
}
