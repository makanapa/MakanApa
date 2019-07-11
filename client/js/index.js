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
}

function noToken(){
  $('#to-login').show()
  $('#to-register').show()
  $('#register').hide()
  $('#login').show()
  $('#to-logout').hide()
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