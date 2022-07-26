const API_KEY = process.env.PROJECT_API_KEY;
const searchBtn = document.getElementsByClassName('search-btn')
const searchBar = document.getElementById('search-bar')

const PageList = (argument = '') => {
  const landingPage = document.getElementById('landing-page');
  landingPage.innerHTML = "";
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
          console.log(responseData.results);
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
  };

  const displayResults = (articles) => {
    
    let arrayImg = ['' ,'<i class="fab fa-windows" style="font-size:30px"></i>', '<i class="fab fa-playstation" style="font-size:30px"></i>', '<i class="fab fa-xbox" style="font-size:30px"></i>', '<i class="fab fa-app-store-ios" style="font-size:30px"></i>', '<i class="fab fa-apple" style="font-size:30px"></i>', '<i class="fab fa-linux" style="font-size:30px"></i>', '<i class="fab fa-nintendo-switch" style="font-size:30px"></i>', '<i class="fab fa-android" style="font-size:30px"></i>'];


    const resultsContent = articles.map((article) => (
      `<div id="container">	
	         <div class="product-details">
            <h1>${article.name}</h1>
               <p class="information">" Let's spread the joy , here is Christmas , the most awaited day of the year.Christmas Tree is what one need the most. Here is the correct tree which will enhance your Christmas.</p>
            <div class="control">
               <a class="btn" href="#pagedetail/${article.id}"> See More ${article.id}</a>
            </div>    
         </div>
         <div class="product-image">
            <img src="${article.background_image}">
            <div class="info">
               <h2> Description</h2>
               <ul>
                  <li><strong>Date de sortie : </strong> ${article.released} </li>
                  <li><strong>Genres : </strong>${article.genres.map(genre => genre.name)}</li>
                  <li><strong>Plateformes: </strong><div>${article.parent_platforms.map(e => arrayImg[e.platform.id]).join(' ')}</div></li>
                  <li><strong>Plateformes: </strong>${article.platforms.map(platform => platform.platform.name)}</li>
                  <li><strong>Decoration: </strong>${article.editor}</li>
                  <li><strong>Note/Nombre de votes: </strong>${article.rating}/5 - ${article.ratings_count}</li>
               </ul>
            </div>
         </div>
      </div>`
    ));
    const resultsContainer = document.querySelector('.page-list .articles');
    resultsContainer.innerHTML = resultsContent.join("\n");


  };


  const render = () => {
    pageContent.insertAdjacentHTML("beforeend", `
       <section class="page-list">
       <div class="loading"></div>
         <div class="articles"></div>
       </section>
     `);

    preparePage();
    
  };

  render();
};

export { PageList }