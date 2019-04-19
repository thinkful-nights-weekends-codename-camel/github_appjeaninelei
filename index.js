'use strict';
console.log('js connected');
const apiKey = /*your API key here*/

// const searchURL = 'https://newsapi.org/v2/everything';


function formatQueryParams(params) {
  console.log('format ran');
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    
    $('#results-list').append(
      `<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
      <p>${responseJson.articles[i].source.name}</p>
      <p>By ${responseJson.articles[i].author}</p>
      <p>${responseJson.articles[i].description}</p>
      <img src='${responseJson.articles[i].urlToImage}'>
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