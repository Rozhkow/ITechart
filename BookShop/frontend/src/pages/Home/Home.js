import React, { useState, useContext, useEffect, useReducer } from "react";
import { useQuery } from "@apollo/client";
import { Container, Grid } from "semantic-ui-react";

import GoodCard from "../../components/Good/GoodCard/GoodCard";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../../context/auth";

import ImageSlider from "../../components/Slider/ImageSlider";
import { SliderData } from "../../components/Slider/SliderData";
import GoodForm from "../../components/Good/GoodForm/GoodForm";

import "./Home.css";
import { FETCH_ITEMS_QUERY } from "../../util/graphql";

function Reducer(state, action) {
  switch (action.type) {
    case "UPDATE_GOODS":
      console.log(action.payload);
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
    if (!loading && data && data.events) {
      dispatch({ type: "UPDATE_GOODS", payload: data.events });
    }
  }, [data, loading]);

  const { goods } = state;

  const [pageNumber, setPageNumber] = useState(0);
  const goodsPerPage = 6;
  const pagesVisited = pageNumber * goodsPerPage;
  const pageCount = Math.ceil(goods.length / goodsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
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
      <Grid columns={3} className="Cards" stackable>
        <Grid.Row>
          <Grid.Column>
            {user && user.admin === true ? <GoodForm data={data} /> : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading goods..</h1>
          ) : (
            goods &&
            goods
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .slice(pagesVisited, pagesVisited + goodsPerPage)
              .map((good) => (
                <Grid.Column key={good.id} style={{ marginBottom: 20 }}>
                  <GoodCard good={good} />
                </Grid.Column>
              ))
          )}
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
}

export default HomePage;
