import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  getCreditMovie,
  getDetailMovie,
  IBox,
  ICredit,
  IDetailMovie,
} from "../../Routes/api";
import {
  makeImagePath,
  noImage,
  slidToggle,
  searchKeyword,
} from "../../Routes/utils";
import StarAverage from "./StarAverage";

interface IClickMovieProps {
  clickedMovie: IBox;
  slidIndex: number;
  scroll: number;
}

const MovieOverlay = ({
  clickedMovie,
  slidIndex,
  scroll,
}: IClickMovieProps) => {
  const history = useHistory();

  const movieId = clickedMovie.id;
  const movieClicked = useRecoilValue(slidToggle);
  const keyword = useRecoilValue(searchKeyword);
  const { data: creditData, isLoading: creditLoading } = useQuery<ICredit>(
    ["creditMovie", movieId],
    () => getCreditMovie(movieId)
  );
  const { data: detailMovie, isLoading: detailLoading } =
    useQuery<IDetailMovie>(["detailMovie", movieId], () =>
      getDetailMovie(movieId)
    );

  console.log("detailMovie", detailMovie);

  const onOverlayClick = () => {
    if (movieClicked === 5) {
      history.push(`/search?keyword=${keyword}`);
    } else {
      history.push("/");
    }
  };
  const director =
    creditData &&
    creditData?.crew.find(
      ({ known_for_department }) => known_for_department === "Directing"
    );

  const directorImage =
    director && director.profile_path
      ? makeImagePath(director.profile_path, "w200")
      : noImage;

  const actorFirstImage =
    creditData && creditData?.cast.length > 1 && creditData.cast[0].profile_path
      ? makeImagePath(creditData.cast[0].profile_path, "w200")
      : noImage;

  const actorSecondImage =
    creditData && creditData?.cast.length > 1 && creditData.cast[1].profile_path
      ? makeImagePath(creditData.cast[1].profile_path, "w200")
      : noImage;

  const Loading = creditLoading && detailLoading;

  return (
    <AnimatePresence>
      {Loading ? (
        <Loader>Loading...</Loader>
      ) : (
        creditData &&
        detailMovie && (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie
              key={clickedMovie.id}
              layoutId={clickedMovie.id + slidIndex + ""}
              style={{ top: scroll + 100 }}
            >
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top,black,transparent),url(${makeImagePath(
                    detailMovie.backdrop_path || detailMovie.poster_path,
                    "w500"
                  )})`,
                }}
              >
                <BigTitle>{detailMovie.title}</BigTitle>
                <Poster
                  src={makeImagePath(
                    detailMovie.poster_path || detailMovie.backdrop_path,
                    "w200"
                  )}
                />
              </BigCover>

              <BigItems>
                <Release>
                  <h2>Release : {detailMovie.release_date}</h2>
                </Release>
                <Genres>
                  <h2>Genres :</h2>
                  {detailMovie.genres.map((item) => (
                    <Genre key={item.id}>{item.name}</Genre>
                  ))}
                </Genres>
                <Runtime>
                  <h2>Running : {detailMovie.runtime}min</h2>
                </Runtime>
                <Vote>
                  <h2>VoteAverage :</h2>
                  <StarAverage rating={detailMovie.vote_average} />
                  <h2>{detailMovie.vote_average.toFixed(1)} / 10</h2>
                </Vote>
                <BigOverview>{detailMovie.overview}</BigOverview>
                {creditData.cast.length > 1 ? (
                  <>
                    <MovieCredit>
                      {creditData.crew.length > 1 ? (
                        <Item
                          style={{
                            backgroundImage: `url(${directorImage})`,
                          }}
                        >
                          <h1>Drector</h1>
                          <Name>{director?.name}</Name>
                        </Item>
                      ) : null}

                      <Item
                        style={{
                          backgroundImage: `url(${actorFirstImage})`,
                        }}
                      >
                        <h1>Actor</h1>
                        <Name>{creditData.cast[0].name}</Name>
                      </Item>
                      <Item
                        style={{
                          backgroundImage: `url(${actorSecondImage})`,
                        }}
                      >
                        <h1>Actor</h1>
                        <Name>{creditData.cast[1].name}</Name>
                      </Item>
                    </MovieCredit>
                  </>
                ) : null}
              </BigItems>
            </BigMovie>
          </>
        )
      )}
    </AnimatePresence>
  );
};

export default MovieOverlay;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 2;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 85vh;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
  z-index: 3;
  display: flex;
  flex-direction: column;
`;

const BigCover = styled.div`
  width: 100%;
  height: 50%;
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: flex-end;
`;
const Poster = styled.img`
  position: relative;
  top: 15px;
  border-radius: 20px;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 32px;
  padding: 15px;
  margin-right: 12%;
`;

const BigItems = styled.div`
  height: 50%;
  overflow: auto;
`;

const Release = styled.div`
  margin: 20px 0;
  h2 {
    padding-left: 20px;
    font-size: 24px;
  }
`;

const Genres = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 20px;

  h2 {
    padding-left: 20px;
    font-size: 24px;
  }
`;

const Runtime = styled.div`
  margin-bottom: 20px;
  h2 {
    padding-left: 20px;
    font-size: 24px;
  }
`;

const Vote = styled.div`
  display: flex;
  justify-content: start;
  text-align: center;
  align-items: center;

  h2 {
    padding-left: 20px;
    font-size: 24px;
  }
`;

const Genre = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.black.darker};
  text-align: center;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  margin: 0 7px;
`;

const MovieCredit = styled.div`
  display: flex;
  justify-content: center;
  height: 50%;
  margin: 0 auto;
`;

const BigOverview = styled.p`
  padding: 20px;
  font-size: 18px;
  color: ${(props) => props.theme.white.lighter};
  width: 100%;
  overflow: hidden;
  margin-bottom: 35px;
`;

const Item = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-size: cover;
  background-position: center center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 auto;

  h1 {
    position: absolute;
    top: -25px;
    font-size: 24px;
  }
`;

const Name = styled.h2`
  position: absolute;
  text-align: center;
  bottom: -25px;
`;
