import React, { useEffect } from 'react'
import { searchAPIData } from '../utils/apiService'
import SearchBar from "../components/SearchBar/SearchBar";

const Search = () => {
  const global = {
    currentPage: window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0
    }
  };

  // Show Alert
  // function showAlert(message, className = 'error') {
  //   const alertEl = document.createElement('div');
  //   alertEl.classList.add('alert', className);
  //   alertEl.appendChild(document.createTextNode(message));
  //   document.querySelector('#alert').appendChild(alertEl);
  //   setTimeout(() => alertEl.remove(), 3000);
  // }

  // Create and display pagination for search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
      <button class="btn btn-primary" id="prev">Prev</button>
      <button class="btn btn-primary" id="next">Next</button>
      <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `
  document.querySelector('#pagination').appendChild(div);

  // Disable prev button if on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  } 
  // Disable next button if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  } 

  // Next page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData(global);
    displaySearchResults(results);
  });
  // Prev page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData(global);
    displaySearchResults(results);
  });
}

  function displaySearchResults(results) {
    // Clear previous results
    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#search-results-heading').innerHTML = '';
    document.querySelector('#pagination').innerHTML = '';
  
    results.forEach((result) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
            <a href="${global.search.type}?id=${result.id}">
              ${
                result.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                class="card-img-top"
                alt="${global.search.type === 'movie' ? result.title : result.name}"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${global.search.type === 'movie' ? result.title : result.name}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
              </p>
            </div>
          `;
  
  
      document.querySelector('#search-results-heading').innerHTML = `
          <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
      `    
      document.querySelector('#search-results').appendChild(div);
  
    });
    displayPagination();
  }

  // Search Movies/Shows
  async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');

    if (global.search.term !== '' && global.search.term !== null) {
      const { results, total_pages, page, total_results } = await searchAPIData(global);
      
      global.search.page = page;
      global.search.totalPages = total_pages;
      global.search.totalResults = total_results;

      if (results.length === 0) {
        showAlert('No results found')
        return;
      }

      displaySearchResults(results)

      document.querySelector('#search-term').value = '';

    } else {
      showAlert('Please enter a search term', 'error')
    }
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <SearchBar />
      <section id="search-results-wrapper" className="container">
        <heading id="search-results-heading"></heading>
        <div id="search-results" className="grid"></div>
        <div id="pagination"></div>
      </section>
    </>
  )
}

export default Search