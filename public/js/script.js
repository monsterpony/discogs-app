$(document).ready(function() {
    console.log('roll\'n')

$('.search-button').on('click', function() {
  console.log('click')
  let $choice = $('#selectChoice option:selected');
  let $choiceData = $choice.val();


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




             // $.ajax({
             //         //we are requesting data from the /movies page to use in our ajax success
             //         url: './api/search',
             //         method: 'GET',
             //         dataType: 'json',
             //         data: {type: $choiceData, value:$searchInput},
             //         success: function(data) {

             //          console.log('woreked')

             //            console.log(data, " AJAX")

             //            } //end success
             //    }) //end ajax
             // $(this).text('Search Again');
        }) //end search button click






});//END PROJECT

