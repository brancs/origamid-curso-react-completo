import React from "react";
import Feed from "./Feed/Feed";
import Head from "./Helper/Head";

const Home = () => {
  return (
    <section className="container main-container">
      <Head title="Fotos" description="Home do site Dogs, com o feed dde fotos." />
      <Feed />
    </section>
  );
};

export default Home;
