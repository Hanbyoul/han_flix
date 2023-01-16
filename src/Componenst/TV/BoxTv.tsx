import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IBox } from "../../Routes/api";
import { makeImagePath, slidToggle } from "../../Routes/utils";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -80,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3,
    },
    zIndex: 3,
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3,
    },
    zIndex: 3,
  },
};

interface ITvBoxProps {
  tv: IBox;
  slidIndex: number;
}

const BoxTv = ({ tv, slidIndex }: ITvBoxProps) => {
  const history = useHistory();
  const setMovieClicked = useSetRecoilState(slidToggle);
  const onBoxClicked = (tvId: number) => {
    setMovieClicked(slidIndex);
    history.push(`/tv/${tvId}`);
  };

  return (
    <Box
      layoutId={tv.id + slidIndex + ""}
      onClick={() => onBoxClicked(tv.id)}
      variants={boxVariants}
      transition={{ type: "tween" }}
      whileHover="hover"
      initial="normal"
      bgphoto={makeImagePath(tv.backdrop_path || tv.poster_path, "w500")}
    >
      <Info variants={infoVariants}>
        <h4>{tv.name}</h4>
      </Info>
    </Box>
  );
};

export default BoxTv;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;

  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 18px;
  }
  position: relative;
  top: 160px;
`;
