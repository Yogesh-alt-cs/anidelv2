import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import Skeleton from "../components/Skeleton";

const TrendingLayout = ({ data, isLoading }) => {
  return (
    <div className="trending mt-5">
      <Heading className="mb-2">Trending</Heading>
      <Swiper
        modules={[Navigation]}
        navigation
        breakpoints={{
          0: { slidesPerView: 3 },
          800: { slidesPerView: 4 },
          1320: { slidesPerView: 6 },
        }}
      >
        {(isLoading ? [...Array(10)] : data || []).map((item, index) => (
          <SwiperSlide key={isLoading ? index : item.id}>
            {isLoading ? (
              <div className="item flex flex-col items-center overflow-hidden px-1 md:px-2">
                <Skeleton className="w-full h-0 pb-[150%] mb-2" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            ) : (
              <div className="item flex flex-col items-center overflow-hidden px-1 md:px-2">
                <Link
                  to={`/anime/${item.id}`}
                  className="poster w-full h-0 pb-[150%] bg-lightbg relative overflow-hidden"
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    src={item.poster}
                    alt={item.title}
                  />
                  <div className="rank p-1 text-sm md:text-base md:p-2 font-extrabold absolute top-0 bg-white text-center text-black">
                    0{item.rank}
                  </div>
                </Link>
                <h2
                  title={item.title}
                  className="title cursor-default text-sm font-semibold text-center  truncate w-full"
                >
                  {item.title}
                </h2>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingLayout;
