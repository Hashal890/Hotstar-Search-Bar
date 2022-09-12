let id;

async function main() {
  let query = document.getElementById("query").value;
  let res = searchMovies(query);
  let data = await res;
  // console.log(data);
  displayData(data);
}

async function searchMovies(query) {
  try {
    const url = `https://www.omdbapi.com/?s=${query}&apikey=ebcf348d`;
    let res = await fetch(url);
    let data = await res.json();
    // console.log(data);
    let imdbData = [];
    for (let i = 0; i < data.Search.length; i++) {
      let imdbUrl = `https://www.omdbapi.com/?t=${data.Search[i].Title}&apikey=ebcf348d`;
      let res2 = await fetch(imdbUrl);
      imdbData.push(await res2.json());
    }
    // console.log(imdbData);
    return imdbData;
  } catch (err) {
    console.log(err);
  }
}

let movies = document.getElementById("movies");
let moviesDisplay = document.getElementById("moviesDisplay");

function displayData(data) {
  movies.innerHTML = null;
  if (data === undefined) return false;
  // console.log(data);
  data.forEach(function (el) {
    let title = document.createElement("h1");
    title.innerText = el.Title;
    title.style.fontSize = "14px";
    title.style.paddingLeft = "10%";
    title.style.paddingTop = "3%";

    let div = document.createElement("div");
    div.append(title);
    movies.append(div);

    title.addEventListener("click", function () {
      moviesDisplay.innerHTML = null;

      let image = document.createElement("img");
      image.src = el.Poster;

      title = document.createElement("h1");
      title.innerText = el.Title;
      title.style.fontSize = "25px";
      title.style.textAlign = "justify";

      let date = document.createElement("h2");
      date.innerText = el.Released;

      let rating = document.createElement("h4");
      rating.innerText = el.imdbRating;

      let category = document.createElement("h4");
      category.innerText = el.Genre;

      let recommend = document.createElement("h4");
      recommend.innerText = "Recommend";
      recommend.style.color = "green";

      let divDisplay = document.createElement("div");
      divDisplay.append(image, title, date, rating, category);

      if (Number(el.imdbRating) > 8.5)
        divDisplay.append(image, title, recommend, date, rating, category);

      moviesDisplay.append(divDisplay);
    });
  });
}

function debounce(func, delay) {
  if (id) clearTimeout(id);
  id = setTimeout(function () {
    func();
  }, delay);
}

function goToTrending() {
  window.location.href = "./trending.html";
}
