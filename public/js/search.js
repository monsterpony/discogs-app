$(document).ready(function() {
    console.log('doin it')

$('.add').on('click', function(){
  console.log('clicked')

    $.ajax({
      url: '/user/login',
      dataType: 'json',
      method: 'POST',
      success: function(data){
        console.log(data)
      },
      error: ()=> {
        console.log('error')
      }


    })

})//end click





  })
