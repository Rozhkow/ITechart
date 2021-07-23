import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Container, Grid } from "semantic-ui-react";

import GoodCard from "../../components/Good/GoodCard/GoodCard";
import { AuthContext } from "../../context/auth";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

import ImageSlider from "../../components/Slider/ImageSlider";
import { SliderData } from "../../components/Slider/SliderData";
import GoodForm from "../../components/Good/GoodForm/GoodForm";
import Spinner from "../../components/Spinner";

import "./Home.css";
import { FETCH_ITEMS_QUERY } from "../../util/graphql";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

function HomePage() {
  const images = importAll(
    require.context("../../img", false, /\.(png|jpe?g|svg)$/)
  );

  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, data } = useQuery(FETCH_ITEMS_QUERY);

  const goods = (!loading && data && data?.events) || [];

  const [pageNumber, setPageNumber] = useState(0);
  const goodsPerPage = 6;
  const pagesVisited = pageNumber * goodsPerPage;
  const pageCount = Math.ceil(goods.length / goodsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className="Home">
      <ImageSlider slides={SliderData} />

      <Search setSearchTerm={setSearchTerm} />

      <Grid columns={3} className="Cards" stackable>
        <Grid.Row>
          <Grid.Column>
            {user && user.admin && <GoodForm data={data} />}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {goods &&
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
              .map((good, index) => (
                <Grid.Column key={good.id} className="goodCards">
                  <GoodCard
                    good={good}
                    image={images[Object.keys(images)[index]]?.default || ""}
                  />
                </Grid.Column>
              ))}
        </Grid.Row>
      </Grid>

      <Pagination pageCount={pageCount} changePage={changePage} />
    </Container>
  );
}

export default HomePage;
