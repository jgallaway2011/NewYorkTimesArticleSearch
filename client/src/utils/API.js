import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
const APIKEY = process.env.REACT_APP_NEW_YORK_TIMES_API_KEY;

// Search for articles using NYT API
function searchArticles(params) {
  console.log("These are the params: ", params);
  let searchParams = "&q=" + params.query
  if (parseInt(params.startYear, 4)) {
    searchParams = searchParams + "&begin_date=" + params.startYear + "0101";
  }
  if (parseInt(params.endYear, 4)) {
    searchParams = searchParams + "&end_date=" + params.endYear + "0101";
  }
  console.log("These are the search params: ", searchParams);
  return axios.get(BASEURL + APIKEY + searchParams);
}

// Gets all saved articles
function getArticles() {
  return axios.get("/api/articles");
}

// Gets the article with the given id
function getArticle(id) {
  return axios.get("/api/articles/" + id);
}

// Deletes the article with the given id
function deleteArticle(id) {
  return axios.delete("/api/articles/" + id);
}

// Saves an article to the database
function saveArticle(articleData) {
  return axios.post("/api/articles", articleData);
}

const API = {
  searchArticles,
  getArticles,
  getArticle,
  deleteArticle,
  saveArticle
};

export default API;