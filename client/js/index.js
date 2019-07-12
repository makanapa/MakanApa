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
      // event.preventDefault()
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
    
    //====== Show Weather ======
    $.ajax({
      url: `${baseUrl}/weathers?location=${city}`,
      type: 'get'
    })
    .done(data =>{
      $('#weather').empty()
      console.log('weather',data)
      $('#weather').append(`
        <p> Location: ${city} </p>
        <p> Current Weather: ${data.weather[0].main}</p>
        <p> Description : ${data.weather[0].description}</p>
      `)
    })
    .fail(function(error){
      console.log('error get data weather')
    })


    $.ajax({
      url: `${baseUrl}/resto/city/${city}`,
      type: 'get'
    })
    .done(data =>{
      $('#row-resto').empty()
      
      let restaurants= data.restaurants
      let list = ""
      for (let i = 0; i < restaurants.length; i++) {
        console.log(restaurants[i])
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
                  <a href="#">Detail</a>
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
