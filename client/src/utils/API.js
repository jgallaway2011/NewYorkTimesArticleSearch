import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
const APIKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

export default {
  searchArticles: function(params) {
    console.log("These are the params: ", params);
    let searchParams = "&q=" + params.query
    if (parseInt(params.startYear, 4)) {
      searchParams = searchParams + "&begin_date=" + params.startYear + "01010";
    }
    if (parseInt(params.endYear, 4)) {
      searchParams = searchParams + "&end_date=" + params.endYear + "0101";
    }
    console.log("These are the search params: ", searchParams);
    return axios.get(BASEURL + APIKEY + searchParams)
  },
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
