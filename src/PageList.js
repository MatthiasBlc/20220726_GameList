const API_KEY = process.env.PROJECT_API_KEY;
const searchBtn = document.getElementsByClassName('search-btn')
const searchBar = document.getElementById('search-bar')

const PageList = (argument = '', numberOfGame = 9) => {
  const landingPage = document.getElementById('landing-page');
  landingPage.innerHTML = "";
  console.log("aaaaaaaaaaaaaa")
  // console.log(numberOfGame)
  // let numberOfCard = document.querySelectorAll("#container").length
  // console.log(numberOfCard)
  // console.log("aaaaaaaaaaaaaa")
  const showMore = document.getElementById('showMore');
  showMore.style.display = "block";

  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');
    numberOfGame = 9;
    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
          console.log(responseData.results);
        });
    };

    // var platformList = []
    const fetchPlatform = (url) => {
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          displayList(responseData.results);
          console.log(responseData.results);
        });
    };

    fetchPlatform(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`);
    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${numberOfGame}`, cleanedArgument);

    console.log(searchBar.value);
    showMore.addEventListener('click', () => {
      numberOfGame += 9;
      if (searchBar.value == '') {
        let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${numberOfGame}`
        fetchList(url, cleanedArgument);
      } else {
        const cleanedSearchBar = searchBar.value.trim().replace(/\s+/g, '-');
        let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${numberOfGame}`
        fetchList(url, cleanedSearchBar);
      }
      if (numberOfGame === 27) {
        showMore.style.display = "none";
        numberOfGame = 9
      }
    })
  };




  const displayList = (platforms) => {
    const selectList = platforms.map((platform) => (`<option>${platform.name}</option>`));
    selectList.unshift('<option>Any</option>');
    const select = document.getElementById('select');
    select.innerHTML = selectList.join("\n");
  };


  const displayResults = (articles) => {
    let icons = ['', '<i class="fab fa-windows" style="font-size:30px"></i>', '<i class="fab fa-playstation" style="font-size:30px"></i>', '<i class="fab fa-xbox" style="font-size:30px"></i>', '<i class="fab fa-app-store-ios" style="font-size:30px"></i>', '<i class="fab fa-apple" style="font-size:30px"></i>', '<i class="fab fa-linux" style="font-size:30px"></i>', '<i class="fab fa-nintendo-switch" style="font-size:30px"></i>', '<i class="fab fa-android" style="font-size:30px"></i>'];

    const resultsContent = articles.map((article) => (
      `<div id="container">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${article.background_image}" alt="Card image cap">
          <div class="info">
            <ul>
              <li><strong>Date de sortie : </strong> ${article.released} </li>
              <li><strong>Genres : </strong>${article.genres.map((genre) => genre.name)}</li>
              <li><strong>Note/Nombre de votes: </strong>${article.rating}/5 - ${article.ratings_count}</li>
              <li id="platforms"><strong>Plateformes: </strong>${article.platforms.map((platform) => platform.platform.name)}</li>
            </ul>
          </div>
          <div class="card-body">
            <h5 class="card-title"><a href="#pagedetail/${article.id}">${article.name}</a></h5>
            <div class="iconsCard">
              <p class="card-text">${article.parent_platforms ? article.parent_platforms
        .map((platform) => icons[platform.platform.id])
        .join("")
        : ""}
              </p>
           </div>
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