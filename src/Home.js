import { map } from 'jquery';
import { PageList } from './PageList'
const showMore = document.getElementById('showMore');

const selectblock = document.querySelector('select');
const selectResult = document.querySelector('#select');

const Home = (argument = '') => {
   const searchBtn = document.getElementById('btnSearch')
   const searchBar = document.getElementById('search-bar')
   let numberOfPages = 0;
   const landingPage = document.getElementById('landing-page');
   let landingPageArgument = `&dates=2022-07-01,2023-07-30&ordering=-added&page_size=${(numberOfPages += 9)}`;
   PageList(landingPageArgument);
   landingPage.insertAdjacentHTML("afterbegin", 
   `<div class="welcome-container">
   <div class="welcome">
      <h1>Welcome,</h1>
      <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
         the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
         brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
         groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
         with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
      </div>
   </div>`);


   searchBtn.addEventListener('click', () => {
      PageList(searchBar.value)
   })

   selectblock.addEventListener('click', (event) => {
      event.preventDefault();
      // console.log(selectResult.value);
      let gameBlock = document.querySelectorAll("#container")
      // console.log(gameBlock);
      if (selectResult.value != "Any") {
         gameBlock.forEach(element => {
            element.style.display = "block";
            let gameBlockPlatforms = element.querySelector("#platforms");
            let gameBlockPlatformsHtml = gameBlockPlatforms.innerHTML.includes(selectResult.value);
            // console.log(gameBlockPlatforms.innerHTML);
            // console.log(gameBlockPlatformsHtml);
            if (!gameBlockPlatformsHtml) {
               element.style.display = "none";
            }
         });
      }
   })


   showMore.addEventListener('click', () => {
      let landingPageArgument2 = `&dates=2022-07-01,2023-07-30&ordering=-added&page_size=${(numberOfPages += 9)}`;
      PageList(landingPageArgument2);
      numberOfPages === 27 ? showMore.remove() : showMore
   })
};

export { Home }