import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { ArticleList, Article } from "../../components/List";

class NYTArticles extends Component {
  state = {
    results: [],
    query: "",
    startYear: "",
    endYear: ""
  };

  saveArticle = (result) => {
    API.saveArticle({
      image: `https://static01.nyt.com/${result.multimedia[12].url}`,
      title: result.headline.main,
      summary: result.snippet,
      byline: result.byline.original,
      source: result.source,
      url: result.web_url,
      pub_date: result.pub_date
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
      // .then(this.handleCardRemoval(result._id));
  };

  // handleCardRemoval = id => {
  //   document.getElementById(id).remove();
  // }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchArticles({
      query: this.state.query,
      startYear: this.state.startYear,
      endYear: this.state.endYear
    })
      .then(res => {
        console.log(res);
        this.setState({ results: res.data.response.docs, query: "", startYear: "", endYear: "" })
      })
      .catch(err => console.log(err))
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New York Times Article Search</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <form>
              <Input
                value={this.state.query}
                onChange={this.handleInputChange}
                name="query"
                placeholder="Optional Search Term"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Optional Start Year"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="Optional End Year (Put year after desired end year date)"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md 12">
            {this.state.results.length ? (
              <ArticleList>
                {this.state.results.map(result => (
                  <Article key={result._id}>
                    <div className="card mt-3 mb-3 border border-dark">
                      <div className="row no-gutters">
                        <div className="col-auto">
                          <img className="img-fluid" src={`https://static01.nyt.com/${result.multimedia[21].url}`} alt={result.source}></img>
                        </div>
                        <div className="col">
                          <div className="card-block px-2">
                            <h4 className="card-title">{result.headline.main}</h4>
                            <p className="card-text">{result.snippet}</p>
                            <p className="card-text">{result.byline.original} from {result.pub_date}</p>
                            <a href={result.web_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mr-3 mb-3">READ</a>
                            <button onClick={() => this.saveArticle(result)} className="btn btn-primary mb-3">SAVE</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Article>
                ))}
              </ArticleList>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NYTArticles;
