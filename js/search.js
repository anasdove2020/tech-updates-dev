document.addEventListener('DOMContentLoaded', function () {
  var allPosts;
  var posts = [];

  // Load the JSON file containing all URLs
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/all-posts.json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      allPosts = JSON.parse(xhr.responseText);

      for (let i = 0; i < allPosts.title.length; i++) {
        posts.push({
          url: allPosts.url[i],
          title: allPosts.title[i],
          date: allPosts.date[i],
          week: allPosts.week[i],
          bannerUrl: allPosts.bannerUrl[i],
          briefDescription: allPosts.briefDescription[i]
        });
      }
    }
  };
  xhr.send();

  document.querySelector("#search-post-id").addEventListener("keyup", function (e) {
    const val = document.querySelector('#search-post-id').value;
    if (val === '') {
      const searchResultsEl = document.getElementById('search-results-id');
      searchResultsEl.style.display = "none";
    } else {
      const searchResultsEl = document.getElementById('search-results-id');
      searchResultsEl.style.display = "block";

      const postsByTitle = posts.filter(post => post.title.toUpperCase().includes(val.toUpperCase()));
      if (postsByTitle.length === 0) {
        const searchResultsEmptyEl = document.getElementById('search-results-empty');
        searchResultsEmptyEl.style.display = "block";
        const searchResultsDataEl = document.getElementById('search-results-data');
        searchResultsDataEl.style.display = "none";
      } else {
        const searchResultsEmptyEl = document.getElementById('search-results-empty');
        searchResultsEmptyEl.style.display = "none";
        const searchResultsDataEl = document.getElementById('search-results-data');
        searchResultsDataEl.style.display = "block";

        let results = '';

        postsByTitle.forEach(post => {
          var postDateDate = new Date(post.date).toLocaleString('en-us', { day: 'numeric' });
          var postDateMonth = new Date(post.date).toLocaleString('en-us', { month: 'short' });
          var postDateYear = new Date(post.date).toLocaleString('en-us', { year: 'numeric' });
          var postDateFormat = postDateMonth + " " + postDateDate + ", " + postDateYear;
          const html = "<a href='" + post.url + "'> \
                          <div class='search-result-post'> \
                            <div class='search-result-post-image'> \
                              <img src='/assets/images/" + post.bannerUrl + "' +  alt='banner'> \
                            </div> \
                            <div class='search-result-post-detail'> \
                              <div class='search-result-post-detail-header'>Week #" + post.week + " · " + postDateFormat + "</div> \
                              <div class='search-result-post-detail-title'>" + post.title + "</div> \
                              <div class='search-result-post-detail-description'>" + post.briefDescription + "</div> \
                            </div> \
                          </div> \
                        </a>";
          results = results + html;
        });
        
        const innerDiv = document.querySelector('#search-results-data');
        innerDiv.innerHTML = results;
      }
    }
  });
});
