let apiKey = "6d08f3684a3a94352278f141b07ac59f";
let popularMovies = document.getElementById("popularMovies");

async function getData() {
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data.results);
  displayData(data.results);
}

getData();

function displayData(data) {
  popularMovies.innerHTML = null;
  data.forEach(function (el) {
    let name = document.createElement("h1");
    name.innerText = el.original_title;

    let image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500${el.poster_path}`;

    let date = document.createElement("h3");
    date.innerText = el.release_date;

    let rating = document.createElement("h3");
    rating.innerText = `Popularity:- ${el.vote_average}`;

    let div = document.createElement("div");
    div.append(image, name, date, rating);

    popularMovies.append(div);
  });
}
