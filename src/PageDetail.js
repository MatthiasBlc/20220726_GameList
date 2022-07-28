const API_KEY = process.env.PROJECT_API_KEY;
const showMoreBtn = document.getElementById("showMore");
const selectBlock = document.querySelector("select");
const PageDetail = (argument) => {
  let icons = [
    "",
    '<i class="fab fa-windows" style="font-size:15px"></i>',
    '<i class="fab fa-playstation" style="font-size:15px"></i>',
    '<i class="fab fa-xbox" style="font-size:15px"></i>',
    '<i class="fab fa-app-store-ios" style="font-size:15px"></i>',
    '<i class="fab fa-apple" style="font-size:15px"></i>',
    '<i class="fab fa-linux" style="font-size:15px"></i>',
    '<i class="fab fa-nintendo-switch" style="font-size:15px"></i>',
    '<i class="fab fa-android" style="font-size:15px"></i>',
  ];
  window.scrollTo(0, 0);
  selectBlock.style.display = "none";
  showMoreBtn.style.display = "none";
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");
    const displayGame = (gameData) => {
      const {
        name,
        released,
        description,
        background_image,
        rating,
        ratings_count,
        developers,
        parent_platforms,
        platforms,
        publishers,
        genres,
        tags,
        stores,
        id,
        slug,
        website,
      } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector(
        "div.background"
      ).style.background = `url(${background_image})`;
      articleDOM.querySelector("div.background").style.height = `30em`;
      articleDOM.querySelector("div.background").style.backgroundSize = `cover`;
      articleDOM.querySelector(
        "div.background"
      ).style.backgroundPosition = `center`;
      articleDOM.querySelector(
        "div.background"
      ).style.backgroundRepeat = `no-repeat`;
      articleDOM.querySelector("h2.rating span").innerHTML = rating;
      articleDOM.querySelector("h2.rating .vote").innerHTML = ratings_count;
      articleDOM.querySelector("p.developer span").innerHTML = developers.map(
        (developper) => `${developper.name}`
      );
      articleDOM.querySelector("p.platforms span").innerHTML = platforms
        .map((platform) => platform.platform.name)
        .join(", ");
      articleDOM.querySelector("p.publisher span").innerHTML = publishers.map(
        (publisher) => `${publisher.name}`
      );
      articleDOM.querySelector("p.genre span").innerHTML = genres
        .map((genre) => `${genre.name}`)
        .join(", ");
      articleDOM.querySelector("p.tags span").innerHTML = tags
        .map((tag) => `${tag.name}`)
        .join(", ");
      articleDOM.querySelector("p.store span").innerHTML = stores
        .map(
          (store) =>
            `<a href="https://${store.store.domain}">${store.store.name}</a>`
        )
        .join("<br>");
      articleDOM.querySelector(".background").innerHTML = `<button id="websiteBtn" href="${gameData.website}" target="_blank">Check Website <i id="WebsiteIcon" class="fa fa-play"></i></button>`

      fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.count > 0) {
            document.getElementById("video").innerHTML = `
              <video controls style="width:100%">
                  <source src="${resData.results[0].data.max}" type="video/mp4">
              </video>`;
          } else {
            document.getElementById("video").innerHTML = "No trailer available";
          }
        })
        .catch((error) => {
          console.error(error);
        });

      fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.count > 0) {
            document.getElementById("screenshot").innerHTML = `
          <div id="gridscreen" class="row justify-content-around g-4"></div>`;
            resData.results.slice(0, 4).forEach((screen) => {
              document.getElementById("gridscreen").innerHTML += `
              <img src="${screen.image}" class="col-lg-6 col-md-6 col-sm-6">
            `;
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });

      fetch(
        `https://api.rawg.io/api/games/${argument}/game-series?key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((resData) => {
          resData.results.slice(0, 4).forEach((screen) => {
            document.getElementById("similar").innerHTML += `
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${screen.background_image}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title"><a href="#pagedetail/${screen.id}">${screen.name}</a></h5>
              <div class="iconsCard">
                <p class="card-text">${screen.parent_platforms? screen.parent_platforms.map((platform) => icons[platform.platform.id]).join(""): ""}</p>
              </div>
              </div>
              </div>
          `;
          });
        });
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
          console.log(responseData);
        });
    };

    fetchGame("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
     <section class="page-detail">
      <div class="article">
       <div class="background">
       </div>
         <div class="gameDetails">
         <div class="title-rating">
             <div class="col-lg-8 col-md-8 col-sm-12">
               <h1 class="title"></h1>
             </div>
             <div class="col-lg-4 col-md-4 col-sm-12">
               <h2 class="rating"><span></span>/5 - <span class="vote"></span> votes</h2>
             </div>
         </div>
         <p style="margin:0"><strong>Plot</strong></p>
         <p class="description"></p>
         <div class="row mt-3">
              <div class="col-lg-3 col-md-4 col-sm-6">
                <p class="release-date"><strong>Release date</strong><br><span></span></p>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <p class="developer"><strong>Developer</strong><br><span></span></p>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <p class="platforms"><strong>Platforms</strong><br><span></span></p>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <p class="publisher"><strong>Publisher</strong><br><span></span></p>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12">
                <p class="genre"><strong>Genre</strong><br><span></span></p>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12">
                <p class="tags"><strong>Tags</strong><br><span></span></p>
              </div>
          </div>
         <h2 class="mt-3">BUY</h2>
         <p class="store"><span></span></p>
         <h2 class="mt-4">TRAILER</h2>
         <div id="video">
         </div>
         <h2 class="mt-4">SCREENSHOTS</h2>
         <div id="screenshot">
         </div>
         <h2 class="mt-4">SIMILAR GAMES</h2>
         <div id="similar">
         </div>
         </div>
       </div>
     </section>
     `;

    preparePage();
  };

  render();
};

export { PageDetail };