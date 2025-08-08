import React from "react";
import Main from "../Components/Main";
import Row from "../Components/Row";
import requests from "../Requests";
import Faqs from "../Components/Faqs";

const Home = () => {
  return (
    <div>
      <Main />
      <Row rowID="1" title="UpComing" fetchURL={requests.requestUpcoming} />
      <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
      <Row rowID="4" title="TopRated" fetchURL={requests.requestTopRated} />
      <Row
        rowID="5"
        title="Horror Movies"
        fetchURL={requests.requestHorrorMovies}
      />
      <Faqs/>
    </div>
  );
};

export default Home;
