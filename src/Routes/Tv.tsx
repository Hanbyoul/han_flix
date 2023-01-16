import { useQueries } from "react-query";
import styled from "styled-components";
import SliderTv from "../Componenst/TV/SliderTv";
import {
  getAiringTodayTv,
  getOnAirTv,
  getPopularTv,
  getTopRatedTv,
} from "./api";
import { makeImagePath } from "./utils";
import { useEffect, useState } from "react";

const Tv = () => {
  const [random, setRandom] = useState(0);

  const result = useQueries([
    {
      queryKey: "AiringTodayTv",
      queryFn: getAiringTodayTv,
    },
    {
      queryKey: "OnAirTv",
      queryFn: getOnAirTv,
    },
    {
      queryKey: "PopularTv",
      queryFn: getPopularTv,
    },
    {
      queryKey: "TopRatedTv",
      queryFn: getTopRatedTv,
    },
  ]);

  useEffect(() => {
    randomCount();
  }, []);

  const randomCount = () => {
    setRandom(Math.ceil(Math.random() * (19 - 1) + 1));
  };

  const BannerData = result[0] && result[0].data?.results[random];

  const isLoading = result.some((result) => result.isLoading);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(BannerData?.backdrop_path || "")}>
            <Title>{BannerData?.name}</Title>
            <Overview>
              {BannerData && BannerData.overview.length > 200
                ? BannerData.overview.substring(0, 200) + "..."
                : BannerData?.overview}
            </Overview>
          </Banner>

          <Slides>
            <SlideTitle>Airing Today</SlideTitle>
            <SliderTv data={result[0].data} slidIndex={6} />
            <SlideTitle>OnAir</SlideTitle>
            <SliderTv data={result[1].data} slidIndex={7} />
            <SlideTitle>Popular</SlideTitle>
            <SliderTv data={result[2].data} slidIndex={8} />
            <SlideTitle>TopRated</SlideTitle>
            <SliderTv data={result[3].data} slidIndex={9} />
          </Slides>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;

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

const Slides = styled.div``;
const SlideTitle = styled.div`
  font-size: 44px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -110px;
`;
