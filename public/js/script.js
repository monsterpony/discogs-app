$(document).ready(function() {
    console.log('roll\'n')

$('.search-button').on('click', function() {
  console.log('click')
  let $choice = $('#selectChoice option:selected');
  let $choiceData = $choice.val();
  let $artistName;
  let $songTitle;

    if ($choiceData == 'artist'){
      console.log('artist');
    }
     else if ($choice.val() == 'title'){
      console.log('title')
    } else {
      console.log('nope')
    }
    console.log($choiceData)


    let $searchInput = $('#searchInput').val()
    console.log($searchInput)




        //      $.ajax({
        //              //we are requesting data from the /movies page to use in our ajax success
        //              url: './api/'+$choiceData+$searchInput,
        //              method: 'GET',
        //              dataType: 'json',
        //              success: function(data) {



        //                 console.log(data)

        //                 } //end success
        //         }) //end ajax
        //      $(this).text('Search Again');
        }) //end search button click






});//END PROJECT

