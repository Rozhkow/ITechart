import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Grid } from "semantic-ui-react";

import GoodCard from "../components/GoodCard";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../context/auth";

import ImageSlider from "../components/ImageSlider";
import { SliderData } from "../components/SliderData";
import GoodForm from "../components/GoodForm";

import "./Home.css";
import { FETCH_ITEMS_QUERY } from "../util/graphql";

function HomePage() {
  const { user } = React.useContext(AuthContext);
  // if (data) {
  //     console.log(data);
  // }
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery(FETCH_ITEMS_QUERY);

  const [state] = useState({ goods: data ? data.events : [] });

  const { goods } = state;

  const [goodss] = useState(goods.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);
  const goodsPerPage = 6;
  const pagesVisited = pageNumber * goodsPerPage;
  const pageCount = Math.ceil(goodss.length / goodsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const HomePage =
    user && user.username === "admin" ? (
      <Container className="Home">
        <ImageSlider slides={SliderData} />

        <div className="Search">
          <input
            type="text"
            placeholder="Search.."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <Grid columns={3} className="Cards">
          <Grid.Row>
            <Grid.Column>
              <GoodForm />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {goods
              .filter((val) => {
                if (searchTerm == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .slice(pagesVisited, pagesVisited + goodsPerPage)
              .map((good) => (
                <Grid.Column key={good.title} style={{ marginBottom: 20 }}>
                  <GoodCard good={good} />
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>

        <div className="App">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </Container>
    ) : user && user.username !== "admin" ? (
      <Container>
        <ImageSlider slides={SliderData} />

        <div className="Search">
          <input
            type="text"
            placeholder="Search.."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <Grid columns={3}>
          <Grid.Row></Grid.Row>
          <Grid.Row>
            {goods
              .filter((val) => {
                if (searchTerm == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .slice(pagesVisited, pagesVisited + goodsPerPage)
              .map((good) => (
                <Grid.Column key={good.title} style={{ marginBottom: 20 }}>
                  <GoodCard good={good} />
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>

        <div className="App">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </Container>
    ) : (
      <Container>
        <ImageSlider slides={SliderData} />

        <div className="Search">
          <input
            type="text"
            placeholder="Search.."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <Grid columns={3}>
          <Grid.Row></Grid.Row>
          <Grid.Row>
            {goods
              .filter((val) => {
                if (searchTerm == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .slice(pagesVisited, pagesVisited + goodsPerPage)
              .map((good) => (
                <Grid.Column key={good.title} style={{ marginBottom: 20 }}>
                  <GoodCard good={good} />
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>

        <div className="App">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </Container>
    );
  return HomePage;
}

export default HomePage;
