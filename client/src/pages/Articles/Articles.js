import React, { Component } from "react";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { ArticleList, Article } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";

class Articles extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>SAVED ARTICLES</h1>
            </Jumbotron>
          </Col>
        <Col size="md-12">
            {this.state.articles.length ? (
              <ArticleList>
                {this.state.articles.map(article => (
                  <Article key={article._id}>
                    <div className="card mt-3 mb-3 border border-dark">
                      <div className="row no-gutters">
                        <div className="col-auto">
                          <img className="img-fluid" src={article.image} alt={article.source}></img>
                        </div>
                        <div className="col">
                          <div className="card-block px-2">
                            <h4 className="card-title">{article.title}</h4>
                            <p className="card-text">{article.summary}</p>
                            <p className="card-text">{article.byline} from {article.pub_date}</p>
                            <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mr-3 mb-3">READ</a>
                          </div>
                        </div>
                        <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
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

export default Articles;
