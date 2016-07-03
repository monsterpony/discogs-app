$(document).ready(function() {
    console.log('doin it')

$('ul').on('click', '.add', function(){
  console.log('clicked')

  let favArea = $(this).closest('ul')
  let favTitle = favArea.find('h4').text()
  let favURL = favArea.find('img').attr('src')

  //console.log(favTitle, 'favTitle')
  //console.log(favURL, 'favImage')

    $.ajax({
      url: '/user/save',
      dataType: 'json',
      method: 'GEt',
      data: {title: favTitle, url: favURL},
      success: function(data){
        console.log(data)
      },
      error: ()=> {
        console.log('error')
      }


    })//end ajax
$(this).text('Done & Dusted')
})//end click





  })//end file
