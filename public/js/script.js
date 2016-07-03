$(document).ready(function() {
    console.log('roll\'n')

$('.search-button').on('click', function(e) {
  e.preventDefault()
  console.log('click')
  let $choice = $('#selectChoice option:selected');
  let $choiceData = $choice.val();
  let $searchInput = $('#searchInput').val()

  const $searchDiv = $('div.search-list');
  const $inputs = $('input');

             $.ajax({

                     //we are requesting data from the /record page to use in our ajax success
                     url: '/api/record',
                     method: 'GET',
                     dataType: 'json',
                     data: {type: $choiceData, value: $searchInput},
                     success: function(data) {
                          console.log(data)

                            $searchDiv.empty();
                            $inputs.val('');


                               let counter = 1;
                                let $currRow = $('<div>').attr('class', 'row results');


                                if ($searchInput) {
                                    $searchDiv.addClass('expanded');
                                    data.forEach(function(album) {

                                        let $albumImage = $('<img>').attr("src", album.thumb ).addClass('thumb');
                                        let $imageWrap = $('<div>').addClass('image-wrap');
                                        let $threeCol = $('<div>').addClass('three columns album-cards');
                                        let $ul = $('<ul>').addClass('album-search-return');
                                        let $liTitle = $('<li>').text('Title: ' + album.title);
                                        let $liYear = $('<li>').text('Year: ' + album.year);
                                        let $liFormat = $('<li>').text('Format: ' + album.format.join(', '));
                                        let $altImage = $('<img>').attr("src", "/images/discLogo.svg").addClass('alt-image');

                                       //$liButton.append($favButton);


                                        if (album.thumb === "") {
                                          $imageWrap.append($altImage)

                                        }else {
                                          $imageWrap.append($albumImage)
                                        }

                                        $ul.append($imageWrap);
                                        $ul.append($liYear);
                                        $ul.append($liFormat);
                                        //$ul.append($favbutton);
                                        $threeCol.append($ul);
                                        $currRow.append($threeCol);

                                        //If we are starting a new row, append the last row and set currRow
                                        if ((counter > 0) && counter % 4 === 0) {
                                            $('.search-list').append($currRow);
                                            $currRow = $('<div>').attr('class', 'row results');

                                        } //end if

                                        counter++;
                                        $('.search-list').append($currRow);

                                    }); //end for each
                                  }//end if

                        } //end success
                }) //end ajax
             $(this).text('Search Again');
         }) //end search button click






});//END PROJECT

