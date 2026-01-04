import Loader from "../components/Loader";
import { useApi } from "../services/useApi";
import HeroBanner from "../components/HeroBanner";
import notify from "../utils/Toast";
import TrendingLayout from "../layouts/TrendingLayout";
import DynamicLayout from "../layouts/DynamicLayout";
import MainLayout from "../layouts/MainLayout";
import GenresLayout from "../layouts/GenresLayout";
import Top10Layout from "../layouts/Top10Layout";
import useGenresStore from "../store/genresStore";
import { useEffect } from "react";
import useTopTenStore from "../store/toptenStore";
import Footer from "../components/Footer";

import { genres } from "../utils/genres";
import { Helmet } from "react-helmet";
const Home = () => {
  const { data, isLoading, error, isError } = useApi("/home");

  const setGenres = useGenresStore((state) => state.setGenres);
  const setTopTen = useTopTenStore((state) => state.setTopTen);

  useEffect(() => {
    setGenres(genres);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setTopTen(data.data.top10);
    }
  }, [data]);

  if (isError) {
    notify("error", error.message);
    return (
      <div className="text-white text-center mt-20 text-xl font-bold">
        Error loading data: {error.message}. Please try refreshing the page.
      </div>
    );
  }
  return (
    <div className="relative">
      <Helmet>
        <title>
          Anidel | Watch Anime Online - Free Anime Streaming in HD
        </title>
        <meta
          name="description"
          content="Anidel is your ultimate destination for free anime streaming. Watch anime online with SUB and DUB in stunning HD quality."
        />
        <meta property="og:title" content="Anidel - Modern Anime Streaming" />
      </Helmet>
      <HeroBanner slides={data?.data?.spotlight} isLoading={isLoading} />
      <div className="xl:mx-10">
        <TrendingLayout data={data?.data?.trending} isLoading={isLoading} />
        <div className="grid mx-2 grid-cols-12 gap-4 my-5">
          <DynamicLayout
            title="Top Airing"
            endpoint="top-airing"
            data={data?.data?.topAiring}
            isLoading={isLoading}
          />
          <DynamicLayout
            title="Most Popular"
            endpoint="most-popular"
            data={data?.data?.mostPopular}
            isLoading={isLoading}
          />
          <DynamicLayout
            title="Most Favorite"
            endpoint="most-favorite"
            data={data?.data?.mostFavorite}
            isLoading={isLoading}
          />
          <DynamicLayout
            title="Latest Completed"
            endpoint="completed"
            data={data?.data?.latestCompleted}
            isLoading={isLoading}
          />
        </div>
        <div className="row grid my-10 gap-2 justify-center grid-cols-12 sm:mx-2">
          <div className="left col-span-12 xl:col-span-9">
            <MainLayout
              title="Latest Episode"
              endpoint="recently-updated"
              data={data?.data?.latestEpisode}
              isLoading={isLoading}
            />
            <MainLayout
              title="New Added"
              endpoint="recently-added"
              data={data?.data?.newAdded}
              isLoading={isLoading}
            />
            <MainLayout
              title="Top Upcoming"
              endpoint="top-upcoming"
              data={data?.data?.topUpcoming}
              isLoading={isLoading}
            />
          </div>
          <div className="right col-span-12 xl:col-span-3">
            <GenresLayout />
            <Top10Layout />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
