import { useQueries, useQuery } from "react-query";
import YouTube, { YouTubeProps } from "react-youtube";
import styled from "styled-components";
import {
  getNowMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
  getVideoMovieKey,
  IVideoKey,
} from "./api";
import { makeImagePath } from "./utils";

import Slider from "../Componenst/Movie/SliderMovie";
import { useEffect, useState } from "react";

const Home = () => {
  const [random, setRandom] = useState(0);

  const result = useQueries([
    {
      queryKey: "nowPlaying_test",
      queryFn: getNowMovies,
    },
    {
      queryKey: "upComing_test",
      queryFn: getUpComingMovies,
    },
    {
      queryKey: "popular_test",
      queryFn: getPopularMovies,
    },
    {
      queryKey: "top_rated_test",
      queryFn: getTopRatedMovies,
    },
  ]);

  useEffect(() => {
    randomCount();
  }, []);

  const randomCount = () => {
    setRandom(Math.ceil(Math.random() * (19 - 1) + 1));
  };

  const BannerData = result[0] && result[0].data?.results[random];

  const banerId = BannerData && BannerData.id;

  const { data: videoData } = useQuery<IVideoKey>(
    ["video", banerId],
    () => getVideoMovieKey(banerId),
    { enabled: !!result[0].data }
  );

  const isLoading = result.some((result) => result.isLoading);

  const opts: YouTubeProps["opts"] = {
    height: "500",
    width: "700",
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding: 1,
    },
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading.....</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(BannerData?.backdrop_path || "")}>
            <Title>{BannerData?.title}</Title>
            <Overview>
              {BannerData && BannerData.overview.length > 200
                ? BannerData.overview.substring(0, 200) + "..."
                : BannerData?.overview}
            </Overview>
            {videoData && (
              <VideoArea>
                <YouTube videoId={videoData.results[0].key} opts={opts} />
              </VideoArea>
            )}
          </Banner>
          <Slides>
            <SlideTitle>Now Playing</SlideTitle>
            <Slider data={result[0].data} slidIndex={1} />
            <SlideTitle>Up Coming</SlideTitle>
            <Slider data={result[1].data} slidIndex={2} />
            <SlideTitle>Popular</SlideTitle>
            <Slider data={result[2].data} slidIndex={3} />
            <SlideTitle>TopRated</SlideTitle>
            <Slider data={result[3].data} slidIndex={4} />
          </Slides>
        </>
      )}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 32px;
  width: 40%;
  height: 300px;
  overflow: hidden;
`;

const VideoArea = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 30px;
`;

const Slides = styled.div``;
const SlideTitle = styled.div`
  font-size: 44px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -110px;
`;
