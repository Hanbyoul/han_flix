import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getCreditTv, IBox, ICredit } from "../../Routes/api";
import {
  makeImagePath,
  noImage,
  searchKeyword,
  slidToggle,
} from "../../Routes/utils";

interface IClickTvProps {
  clickedTv: IBox;
  slidIndex: number;
  scroll: number;
}

const TvOverlay = ({ clickedTv, slidIndex, scroll }: IClickTvProps) => {
  const history = useHistory();

  const tvId = clickedTv.id;
  const movieClicked = useRecoilValue(slidToggle);
  const keyword = useRecoilValue(searchKeyword);
  const { data } = useQuery<ICredit>(["creditTv", tvId], () =>
    getCreditTv(tvId)
  );

  const onOverlayClick = () => {
    if (movieClicked === 10) {
      history.push(`/search?keyword=${keyword}`);
    } else {
      history.push("/tv");
    }
  };

  const director =
    data &&
    data?.crew.find(
      ({ known_for_department }) => known_for_department === "Directing"
    );

  const directorImage =
    director && director.profile_path
      ? makeImagePath(director.profile_path, "w200")
      : noImage;

  const actorFirstImage =
    data && data?.cast.length > 1 && data.cast[0].profile_path
      ? makeImagePath(data.cast[0].profile_path, "w200")
      : noImage;

  const actorSecondImage =
    data && data?.cast.length > 1 && data.cast[1].profile_path
      ? makeImagePath(data.cast[1].profile_path, "w200")
      : noImage;

  return (
    <AnimatePresence>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <BigMovie
        key={clickedTv.id}
        layoutId={clickedTv.id + slidIndex + ""}
        style={{ top: scroll + 100 }}
      >
        <BigCover
          style={{
            backgroundImage: `linear-gradient(to top,black,transparent),url(${makeImagePath(
              clickedTv.backdrop_path || clickedTv.poster_path,
              "w500"
            )})`,
          }}
        >
          <BigTitle>{clickedTv.name}</BigTitle>
          <Poster
            src={makeImagePath(
              clickedTv.poster_path || clickedTv.backdrop_path,
              "w200"
            )}
          />
        </BigCover>
        <BigItems>
          <BigOverview>{clickedTv.overview}</BigOverview>
          {data && data.cast.length > 1 ? (
            <>
              <MovieCredit>
                {data.crew.length > 1 ? (
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
                  <Name>{data.cast[0].name}</Name>
                </Item>
                <Item
                  style={{
                    backgroundImage: `url(${actorSecondImage})`,
                  }}
                >
                  <h1>Actor</h1>
                  <Name>{data.cast[1].name}</Name>
                </Item>
              </MovieCredit>
            </>
          ) : null}
        </BigItems>
      </BigMovie>
    </AnimatePresence>
  );
};

export default TvOverlay;

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
  margin-right: 15px;
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

const BigOverview = styled.p`
  padding: 20px;
  font-size: 18px;
  color: ${(props) => props.theme.white.lighter};

  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
`;

const MovieCredit = styled.div`
  display: flex;
  justify-content: center;
  height: 50%;
  margin: 0 auto;
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
