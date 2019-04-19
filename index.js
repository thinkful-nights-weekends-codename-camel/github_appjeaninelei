'use strict';
console.log('js connected');

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the object/response array
  for (let i = 0; i < responseJson.length; i++) {  //structure unknown
    
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <li><p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(handle) {
  const searchUrl = `https://api.github.com/users/${handle}/repos`;
  console.log(searchUrl);

  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function watchForm() {
  $('form').submit(event => {
 event.preventDefault();
 console.log('watchform ran');
    const githubHandle = $('#js-search-term').val();
    getRepos(githubHandle);
  });
}

$(watchForm);