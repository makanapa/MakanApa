const baseUrl= 'http://localhost:3000'

$( document ).ready(function() {
    console.log( "ready!" );
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

});


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
       localStorage.setItem('firstName', Data.firstName)
       localStorage.setItem('lastName', Data.lastName)
       localStorage.setItem('userId', Data.id)
       hasToken()
     })
     .fail(function(err){
      console.log(err)
  
     })
  }
