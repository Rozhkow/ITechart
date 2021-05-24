import React, { useState, useContext, useEffect, useReducer } from "react";
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

function Reducer(state, action) {
  switch (action.type) {
    case "UPDATE_GOODS":
      console.log(action.payload)
      return {
        ...state,
        goods: action.payload,
      };
    default:
      throw new Error();
  }
}

function HomePage() {
  const { user } = useContext(AuthContext);
  
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, data } = useQuery(FETCH_ITEMS_QUERY);

  const [state, dispatch] = useReducer(Reducer, {
    goods: data ? data.events : [],
  });

  useEffect(() => {
    console.log(data)
    if(!loading && data && data.events) {
      console.log(data)
      dispatch({ type: 'UPDATE_GOODS', payload: data.events })
    }
  }, [data, loading]);


  const { goods } = state;

  // const [goodss] = useState(goods.slice(0, 10));
  const [pageNumber, setPageNumber] = useState(0);
  const goodsPerPage = 6;
  const pagesVisited = pageNumber * goodsPerPage;
  const pageCount = Math.ceil(goods.length / goodsPerPage);
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
            {loading ? (
            <h1>Loading goods..</h1>
          ) : (
            goods && goods
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
              )))}
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
          <Grid.Row>
            {loading ? (
            <h1>Loading goods..</h1>
          ) : (
            goods && goods
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
              )))}
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
          <Grid.Row>
          {loading ? (
            <h1>Loading goods..</h1>
          ) : (
            goods && goods
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
              )))}
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
