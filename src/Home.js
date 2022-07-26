import { PageList } from './PageList'
const showMore = document.getElementById('show-more');


const Home = (argument = '') => {
   const searchBtn = document.getElementById('btnSearch')
   const searchBar = document.getElementById('search-bar')
   let numberOfPages = 0;
   const landingPage = document.getElementById('landing-page');
   let landingPageArgument = `&dates=2022-07-26,2030-07-26&ordering=-rating&page_size=${(numberOfPages += 9)}`;
   PageList(landingPageArgument);
   landingPage.insertAdjacentHTML("afterbegin" , `<h1>Welcome,</h1>
  <p class="page-description">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure to the entire video game industry, all under one roof. This text seems familiar.</p>`);


   searchBtn.addEventListener('click', () => {
      PageList(searchBar.value)
   })


   showMore.addEventListener('click', () => {
      let landingPageArgument2 = `&dates=2022-07-26,2030-07-26&ordering=-rating&page_size=${(numberOfPages += 9)}`;
      PageList(landingPageArgument2);
      numberOfPages === 27 ? showMore.remove() : showMore
   })
};

export { Home }