import { AnimatePresence, motion, useScroll } from "framer-motion";
import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ISlideDirection, ISlideProps } from "../../Routes/api";
import { slidToggle } from "../../Routes/utils";
import BoxSearch from "./BoxSearch";
import MovieOverlay from "../Movie/MovieOverlay";
import TvOverlay from "../TV/TvOverlay";
import useWindowDimensions from "../WindowDimensions";

const offset = 6;
const SliderSearch = ({ data, slidIndex }: ISlideProps) => {
  const movieClicked = useRecoilValue(slidToggle);

  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/search/:movieId");
  const { scrollY } = useScroll();
  const width = useWindowDimensions();

  const RowVariants = {
    start: ({ back }: ISlideDirection) => ({ x: back ? -width : width }),
    center: { x: 0 },
    exit: ({ back }: ISlideDirection) => ({ x: back ? width : -width }),
  };

  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const MinusIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const clickedMovie =
    movieClicked === slidIndex &&
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      <Slid>
        <Btn>
          <UpBtn onClick={increaseIndex}>&gt;</UpBtn>
          <DownBtn onClick={MinusIndex}>&lt;</DownBtn>
        </Btn>

        <AnimatePresence
          custom={{ back }}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            variants={RowVariants}
            custom={{ back }}
            initial="start"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 2 }}
            key={index}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <BoxSearch key={movie.id} movie={movie} slidIndex={slidIndex} />
              ))}
          </Row>
        </AnimatePresence>
      </Slid>

      {clickedMovie && movieClicked === 5 ? (
        <MovieOverlay
          clickedMovie={clickedMovie}
          slidIndex={slidIndex}
          scroll={scrollY.get()}
        />
      ) : clickedMovie && movieClicked === 10 ? (
        <TvOverlay
          clickedTv={clickedMovie}
          slidIndex={slidIndex}
          scroll={scrollY.get()}
        />
      ) : null}
    </Wrapper>
  );
};

export default React.memo(SliderSearch);

const Wrapper = styled.div``;
const Slid = styled.div`
  position: relative;
  top: -320px;
  margin-bottom: 220px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Btn = styled(motion.div)`
  position: relative;
  z-index: 1;
  button {
    color: ${(props) => props.theme.white.lighter};
    width: 40px;
    height: 200px;
    font-size: 24px;
    font-weight: 300;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.7);
    border: none;
  }
`;
const UpBtn = styled(motion.button)`
  position: absolute;
  right: 0;
  &:hover {
    font-size: 32px;
  }
`;
const DownBtn = styled(motion.button)`
  position: absolute;
  &:hover {
    font-size: 32px;
  }
`;
