$(document).ready(function() {
    console.log('doin it')

    $('.add').on('click', function() {
        console.log('clicked')

        let favArea = $(this).closest('.six')
        let favTitle = favArea.next().children().first().find('h6').text()
        let favURL = favArea.find('img').attr('src')
        console.log(favArea)
        console.log(favTitle, 'favTitle')
        console.log(favURL, 'favImage')

        $.ajax({
            url: '/user/save',
            dataType: 'json',
            method: 'GET',
            data: {
              title: favTitle,
              url: favURL
            },
            success: function(data) {
              console.log('added to your collection')
            },
            error: function(error) {
              console.log(error)
            }


          }) //end ajax
        $(this).text('Done & Dusted').prop('disabled', true);
      }) //end click




    $('.fav-wrap').on('click', '.remove', function() {
        console.log('clicked')

        let itemRemove = $(this).closest('section')
        let favTitle = itemRemove.find('.user-title').text()
        let favURL = itemRemove.find('img').attr('src')

        console.log(itemRemove)

        console.log(favTitle, 'favTitle')
        console.log(favURL, 'favImage')

        $.ajax({
            url: '/user/remove',
            dataType: 'json',
            method: 'GET',
            data: {
              title: favTitle,
              url: favURL
            },
            success: function(data) {
              console.log('removed from your collection')
            },
            error: function(data) {
              console.log(data)
            }


          }) //end ajax
        $(this).parent().remove()
      }) //end click

    $('.logout').hover(function(){
        $('.outer-modal').removeClass('hide');
        $(this).off('mouseenter mouseleave')
      })

    $('.leave-modal').on('click', function(){
       $('.outer-modal').addClass('hide');

    })





  }) //end file
